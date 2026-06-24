'use client'

import dynamic from 'next/dynamic'

const MetaPixelConversions = dynamic(
  () => import('@/components/MetaPixelConversions').then((m) => ({ default: m.MetaPixelConversions })),
  { ssr: false },
)

export function DeferredMetaPixelConversions() {
  return <MetaPixelConversions />
}
