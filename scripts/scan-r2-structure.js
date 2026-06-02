#!/usr/bin/env node

const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const R2_CONFIG = {
  accountId: process.env.R2_ACCOUNT_ID,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  bucketName: process.env.R2_BUCKET_NAME || 'past-papers',
};

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey,
  },
});

async function scanBucketStructure() {
  try {
    console.log('📂 Scanning R2 bucket structure...\n');

    let continuationToken = undefined;
    let totalFiles = 0;
    let totalSize = 0;
    const structure = {};

    do {
      const command = new ListObjectsV2Command({
        Bucket: R2_CONFIG.bucketName,
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      });

      const response = await s3Client.send(command);
      
      if (response.Contents) {
        response.Contents.forEach(obj => {
          const key = obj.Key;
          const size = obj.Size;
          totalSize += size;
          totalFiles++;

          // Parse structure: guess-papers/subject/year/file.pdf or subject/year/file.pdf
          const parts = key.split('/');
          const category = parts[0]; // either "guess-papers", "solved-papers", or subject name

          if (!structure[category]) {
            structure[category] = {
              files: 0,
              size: 0,
              subjects: {},
            };
          }

          structure[category].files++;
          structure[category].size += size;

          // For guess-papers and solved-papers, next part is subject
          if (category === 'guess-papers' || category === 'solved-papers') {
            const subject = parts[1];
            if (!structure[category].subjects[subject]) {
              structure[category].subjects[subject] = { files: 0, size: 0 };
            }
            structure[category].subjects[subject].files++;
            structure[category].subjects[subject].size += size;
          }
        });
      }

      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    // Display structure
    console.log('📊 BUCKET STRUCTURE:\n');
    
    Object.entries(structure).forEach(([category, data]) => {
      const sizeInMB = (data.size / (1024 * 1024)).toFixed(2);
      console.log(`📁 ${category}/`);
      console.log(`   Files: ${data.files}, Size: ${sizeInMB} MB\n`);

      if (Object.keys(data.subjects).length > 0) {
        Object.entries(data.subjects).forEach(([subject, subData]) => {
          const subjectSizeKB = (subData.size / 1024).toFixed(2);
          console.log(`   ├─ ${subject}/: ${subData.files} files (${subjectSizeKB} KB)`);
        });
        console.log('');
      }
    });

    console.log('📈 SUMMARY:');
    console.log(`   Total files: ${totalFiles}`);
    console.log(`   Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`   Base URL: https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com/`);

  } catch (error) {
    console.error('Error scanning bucket:', error);
    process.exit(1);
  }
}

scanBucketStructure();
