export type PinnedExam = { key: string; label: string; href: string }

export function autoPinExam(exam: PinnedExam) {
  try {
    const current = localStorage.getItem('pinnedExam')
    if (current) {
      const parsed: PinnedExam = JSON.parse(current)
      if (parsed.key === exam.key) return
    }
    localStorage.setItem('pinnedExam', JSON.stringify(exam))
    window.dispatchEvent(new CustomEvent('pinnedExamChanged', { detail: exam }))
  } catch {}
}

// Pin after 3+ completed practice sets for the same exam
export function recordExamPractice(exam: PinnedExam) {
  try {
    const countKey = `imtehan_pin_count_${exam.key}`
    const count = parseInt(localStorage.getItem(countKey) || '0') + 1
    localStorage.setItem(countKey, String(count))
    if (count > 3) autoPinExam(exam)
  } catch {}
}
