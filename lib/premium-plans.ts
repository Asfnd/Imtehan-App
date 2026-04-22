/**
 * Single source of truth for Imtehan Premium pricing and included features.
 * Import from here only — do not duplicate amounts elsewhere.
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
    price: 'Rs. 1,500',
    perMonth: 'Rs. 500/mo',
    savings: null,
    badge: 'Popular',
    badgeColor: 'bg-green-100 text-green-700',
    savingsColor: '',
    highlight: false,
    cta: 'Get Started',
  },
  {
    label: '6 Months',
    desc: 'Exam-season prep',
    price: 'Rs. 3,000',
    perMonth: 'Rs. 500/mo',
    savings: null,
    badge: null,
    badgeColor: '',
    savingsColor: '',
    highlight: false,
    cta: 'Get Started',
  },
  {
    label: '12 Months',
    desc: 'Best per-month value',
    price: 'Rs. 6,000',
    perMonth: 'Rs. 500/mo',
    savings: null,
    badge: 'BEST VALUE',
    badgeColor: 'bg-blue-500 text-white',
    savingsColor: '',
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

/** Subtext under “Plans from” on upgrade popups — keep in sync with PREMIUM_PLANS tiers. */
export const PREMIUM_POPUP_VALUE_HINT = 'Longer plans: one payment for the full window at Rs. 500/mo'

/**
 * PKR amount for Meta Pixel / CAPI `Subscribe` when the user’s paid plan is unknown
 * (matches highest tier list price — adjust if you store plan on user metadata later).
 */
export const PREMIUM_SUBSCRIBE_VALUE_PKR = 6000

/** Entry plan price (first tier) for popups — always mirrors PREMIUM_PLANS[0].price */
export function getPremiumEntryPrice(): string {
  return PREMIUM_PLANS[0]?.price ?? 'Rs. 500'
}
