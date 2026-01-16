const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://qsrkkvrrxorbgvbgekew.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzcmtrdnJyeG9yYmd2Ymdla2V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTIzMTMsImV4cCI6MjA3ODAyODMxM30.Cute7xrf3i8Cd4kehjeXdextT96yNnxAp4iJIu4Tz1Y'
);

async function test() {
  const { data, error } = await supabase
    .from('past_papers')
    .select('*')
    .eq('subject', 'agriculture-forestry')
    .eq('year', 2023)
    .single();

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('✅ Found paper:');
  console.log(JSON.stringify(data, null, 2));
  
  // Test R2 URL generation
  const baseUrl = 'https://www.imtehan.com';
  function encodePathSegment(segment) {
    return encodeURIComponent(segment)
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
  }
  
  const r2Url = `${baseUrl}/${encodePathSegment(data.subject)}/${data.year}/${encodePathSegment(data.filename)}`;
  console.log('\n📋 Generated R2 URL:');
  console.log(r2Url);
}

test();
