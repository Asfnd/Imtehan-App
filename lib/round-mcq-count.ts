/**
 * Display helper for MCQ bank sizes on exam/module cards.
 * Keep small syllabus slices exact (Law-GAT modules are often 40–150).
 * Only coarsen large shared banks.
 */
export function roundMcqCount(n: number): string {
  const v = Math.max(0, Math.floor(Number(n) || 0))
  if (v >= 10000) return `${Math.floor(v / 1000)}k+`
  if (v >= 1000) return `${Math.floor(v / 500) * 500}+`
  if (v >= 200) return `${Math.floor(v / 50) * 50}+`
  return `${v}`
}
