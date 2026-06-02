#!/usr/bin/env node

/**
 * Sync database with actual R2 filenames
 * This will update the database to match what's actually in R2
 */

const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const R2_CONFIG = {
  accountId: process.env.R2_ACCOUNT_ID,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  bucketName: process.env.R2_BUCKET_NAME || 'past-papers',
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey,
  },
});

async function syncDatabaseWithR2() {
  console.log('🔄 Syncing database with R2 filenames...\n');

  try {
    // List all files in R2
    const command = new ListObjectsV2Command({
      Bucket: R2_CONFIG.bucketName,
      MaxKeys: 2000,
    });

    const response = await s3Client.send(command);

    if (!response.Contents || response.Contents.length === 0) {
      console.log('❌ No files found in R2');
      return;
    }

    console.log(`📦 Found ${response.Contents.length} files in R2\n`);

    let updated = 0;
    let errors = 0;

    for (const obj of response.Contents) {
      const key = obj.Key;
      const parts = key.split('/');

      // Skip special folders
      if (key.startsWith('Guess Papers/') || key.startsWith('Solved Paper/')) {
        continue;
      }

      // Expected structure: subject/year/filename.pdf
      if (parts.length !== 3) {
        console.log(`⚠️  Skipping ${key} (unexpected structure)`);
        continue;
      }

      const [subject, yearStr, filename] = parts;
      const year = parseInt(yearStr);

      if (isNaN(year)) {
        console.log(`⚠️  Skipping ${key} (invalid year)`);
        continue;
      }

      // Check if record exists in database
      const { data: existing } = await supabase
        .from('past_papers')
        .select('id, filename')
        .eq('subject', subject)
        .eq('year', year)
        .single();

      if (existing) {
        // Update existing record with actual R2 filename
        if (existing.filename !== filename) {
          const { error } = await supabase
            .from('past_papers')
            .update({ filename: filename })
            .eq('id', existing.id);

          if (error) {
            console.log(`❌ Error updating ${subject}/${year}: ${error.message}`);
            errors++;
          } else {
            console.log(`✅ Updated: ${subject}/${year}`);
            console.log(`   Old: ${existing.filename}`);
            console.log(`   New: ${filename}\n`);
            updated++;
          }
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`\n✅ Sync complete!`);
    console.log(`   Updated: ${updated} records`);
    console.log(`   Errors: ${errors}`);
    console.log(`\n🎉 Database is now synced with R2!\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

syncDatabaseWithR2();
