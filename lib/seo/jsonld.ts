/** Safe JSON-LD serialization for script tags. */
export function jsonLdString(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function breadcrumbListNode(
  items: { name: string; url?: string }[],
): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url
        ? { item: item.url.startsWith('http') ? item.url : `https://imtehan.com${item.url}` }
        : {}),
    })),
  }
}

export function breadcrumbJsonLd(
  items: { name: string; url?: string }[],
): object {
  return {
    '@context': 'https://schema.org',
    ...breadcrumbListNode(items),
  }
}
