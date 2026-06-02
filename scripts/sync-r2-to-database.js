#!/usr/bin/env node

const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { createClient } = require('@supabase/supabase-js');

// R2 Configuration
const R2_CONFIG = {
  accountId: process.env.R2_ACCOUNT_ID,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  bucketName: process.env.R2_BUCKET_NAME || 'past-papers',
};

// Supabase Configuration (use SERVICE_ROLE_KEY for insert permission)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey,
  },
});

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function syncR2ToDatabase() {
  try {
    console.log('🔄 Starting sync from R2 to database...\n');

    let continuationToken = undefined;
    let totalScanned = 0;
    const papers = [];

    // List all files from R2
    console.log('📂 Scanning R2 bucket...');
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
          totalScanned++;

          // Parse key: subject/year/filename.pdf or Category/filename.pdf
          const parts = key.split('/');

          if (parts.length === 3) {
            // Past exam papers: subject/year/filename.pdf
            const subject = parts[0];
            const year = parseInt(parts[1]);
            const filename = parts[2];

            if (!isNaN(year) && filename.endsWith('.pdf')) {
              papers.push({
                subject,
                year,
                filename,
                storage_path: key,
                file_size: size,
                is_available: true,
                download_count: 0,
              });
            }
          }
        });
      }

      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    console.log(`✅ Scanned ${totalScanned} files from R2`);
    console.log(`📋 Found ${papers.length} past exam papers\n`);

    // Insert into database in batches
    if (papers.length > 0) {
      console.log('💾 Inserting into database...');
      
      // Insert in batches of 100
      for (let i = 0; i < papers.length; i += 100) {
        const batch = papers.slice(i, i + 100);
        const { error } = await supabase
          .from('past_papers')
          .insert(batch);

        if (error) {
          console.error('❌ Database error:', error);
          return;
        }
        console.log(`  ✅ Inserted batch ${Math.floor(i / 100) + 1} (${batch.length} papers)`);
      }

      console.log(`\n✨ Sync complete! Total: ${papers.length} papers inserted`);

      // Show sample
      console.log('\n📊 Sample entries:');
      papers.slice(0, 5).forEach(p => {
        console.log(`   - ${p.subject} (${p.year}): ${p.filename}`);
      });
    } else {
      console.log('⚠️ No papers found to insert');
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

syncR2ToDatabase();
