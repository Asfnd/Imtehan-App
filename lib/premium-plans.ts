/**
 * Single source of truth for Imtehan Premium pricing and included features.
 * Import from here only; do not duplicate amounts elsewhere.
 *
 * Pricing model: Rs. 500/mo list. Longer windows get a modest prepaid discount
 * (not steep — keeps 1-month fair and rewards commitment lightly).
 */

export interface PremiumPlan {
  label: string
  desc: string
  price: string
  perMonth: string | null
  savings: string | null
  badge: string | null
  badgeColor: string
  savingsColor: string
  highlight: boolean
  cta: string
}

export interface PremiumFeature {
  text: string
  isNew: boolean
}

/** List rate before longer-plan prepaid discount. */
export const PREMIUM_MONTHLY_LIST_PKR = 500

export const PREMIUM_PLANS: PremiumPlan[] = [
  {
    label: '1 Month',
    desc: 'Try full access',
    price: 'Rs. 500',
    perMonth: null,
    savings: null,
    badge: null,
    badgeColor: '',
    savingsColor: '',
    highlight: false,
    cta: 'Get Started',
  },
  {
    label: '3 Months',
    desc: 'Solid prep window',
    // 10% off list (3 × 500)
    price: 'Rs. 1,350',
    perMonth: 'Rs. 450/mo',
    savings: 'Save Rs. 150',
    badge: 'Popular',
    badgeColor: 'bg-green-100 text-green-700',
    savingsColor: 'text-green-600',
    highlight: false,
    cta: 'Get Started',
  },
  {
    label: '6 Months',
    desc: 'Exam-season prep',
    // 10% off list (6 × 500)
    price: 'Rs. 2,700',
    perMonth: 'Rs. 450/mo',
    savings: 'Save Rs. 300',
    badge: null,
    badgeColor: '',
    savingsColor: 'text-green-600',
    highlight: false,
    cta: 'Get Started',
  },
  {
    label: '12 Months',
    desc: 'Best per-month value',
    // 20% off list (12 × 500) — longest plan, still gentle
    price: 'Rs. 4,800',
    perMonth: 'Rs. 400/mo',
    savings: 'Save Rs. 1,200',
    badge: 'BEST VALUE',
    badgeColor: 'bg-blue-500 text-white',
    savingsColor: 'text-blue-600',
    highlight: true,
    cta: 'Get Started',
  },
]

export const PREMIUM_FEATURES: PremiumFeature[] = [
  { text: 'Unlimited AI writing feedback', isNew: true },
  { text: 'Unlimited practice sets across subjects', isNew: false },
  { text: 'All mock tests and timed simulations', isNew: false },
  { text: 'Solved past papers (where offered)', isNew: false },
  { text: 'Premium model sets and curated questions', isNew: false },
  { text: 'Progress tracking and attempt history', isNew: false },
]

/** Subtext under “Plans from” on upgrade popups: keep in sync with PREMIUM_PLANS tiers. */
export const PREMIUM_POPUP_VALUE_HINT =
  'Longer plans: small prepaid discount — yearly from Rs. 400/mo'

/**
 * PKR amount for Meta Pixel / CAPI `Subscribe` when the user’s paid plan is unknown
 * (matches highest tier list price; adjust if you store plan on user metadata later).
 */
export const PREMIUM_SUBSCRIBE_VALUE_PKR = 4800

/** Entry plan price (first tier) for popups: always mirrors PREMIUM_PLANS[0].price */
export function getPremiumEntryPrice(): string {
  return PREMIUM_PLANS[0]?.price ?? 'Rs. 500'
}
