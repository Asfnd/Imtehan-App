#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// R2 Configuration
const R2_CONFIG = {
  accountId: '67225b43c28cc0f6b36a9d5c5ad11b31',
  accessKeyId: '6c78d39366a930efa78ceeb1bde99811',
  secretAccessKey: '81d06ada3ef6f3d93e2632d2407b66859d559b29fa51a801b13fa0e6e7f546eb',
  bucketName: 'past-papers',
};

const LOCAL_PAPERS_PATH = '/Users/asfandiyarsafi/Desktop/CSS Resources/Papers';

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey,
  },
});

async function uploadToR2() {
  try {
    console.log('📂 Reading local papers directory...');
    const files = fs.readdirSync(LOCAL_PAPERS_PATH, { recursive: true }).filter(file =>
      file.endsWith('.pdf') || file.endsWith('.PDF')
    );

    console.log(`✅ Found ${files.length} PDF files to upload\n`);

    let uploadedCount = 0;
    let failedCount = 0;
    const failures = [];

    for (const file of files) {
      const filePath = path.join(LOCAL_PAPERS_PATH, file);

      try {
        const fileBuffer = fs.readFileSync(filePath);
        const fileSize = fileBuffer.length;

        const uploadParams = {
          Bucket: R2_CONFIG.bucketName,
          Key: file,
          Body: fileBuffer,
          ContentType: 'application/pdf',
        };

        await s3Client.send(new PutObjectCommand(uploadParams));
        uploadedCount++;

        const progress = ((uploadedCount + failedCount) / files.length * 100).toFixed(1);
        console.log(`✅ [${uploadedCount + failedCount}/${files.length}] ${progress}% - ${file} (${(fileSize / 1024).toFixed(2)} KB)`);
      } catch (error) {
        failedCount++;
        failures.push({ file, error: error.message });
        console.error(`❌ Failed to upload ${file}: ${error.message}`);
      }
    }

    console.log(`\n📊 Upload Summary:`);
    console.log(`   ✅ Successfully uploaded: ${uploadedCount}/${files.length}`);
    console.log(`   ❌ Failed: ${failedCount}`);
    console.log(`   📍 Bucket: ${R2_CONFIG.bucketName}`);
    console.log(`   🔗 Base URL: https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com/`);

    if (failures.length > 0) {
      console.log(`\n⚠️  Failed uploads:`);
      failures.forEach(f => console.log(`   - ${f.file}: ${f.error}`));
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

uploadToR2();
