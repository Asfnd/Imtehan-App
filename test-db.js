const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
