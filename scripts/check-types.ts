import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const tables = ['pakistan_studies', 'general_knowledge', 'everyday_science']

async function checkTypes() {
  console.log('Checking MCQ types...\n')

  for (const table of tables) {
    console.log(`📊 ${table}:`)

    const { count: practiceCount } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .eq('type', 'practice')

    const { count: importantCount } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .eq('type', 'most_important')

    const { count: repeatedCount } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .eq('type', 'most_repeated')

    console.log(`  📚 Practice: ${(practiceCount || 0).toLocaleString()}`)
    console.log(`  ⭐ Most Important: ${(importantCount || 0).toLocaleString()}`)
    console.log(`  🔥 Most Repeated: ${(repeatedCount || 0).toLocaleString()}`)
    console.log(`  Total: ${((practiceCount || 0) + (importantCount || 0) + (repeatedCount || 0)).toLocaleString()}\n`)
  }
}

checkTypes().catch(console.error)
