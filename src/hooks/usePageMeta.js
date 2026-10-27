import { useEffect } from 'react'

const DEFAULT_OG_IMAGE = 'https://www.nunnarivu.ai/assets/images/og-cover.jpg'
const SITE_NAME = 'Nunnarivu.ai'

export function usePageMeta({
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  canonical,
  article,
} = {}) {
  useEffect(() => {
    if (title) document.title = title

    const setMeta = (attr, name, content) => {
      if (!content) return
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description', description)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:image', ogImage)
    if (canonical) setMeta('property', 'og:url', canonical)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = canonical
    }

    const JSONLD_ID = 'page-json-ld'
    let jsonLd = document.getElementById(JSONLD_ID)
    if (article) {
      if (!jsonLd) {
        jsonLd = document.createElement('script')
        jsonLd.id = JSONLD_ID
        jsonLd.type = 'application/ld+json'
        document.head.appendChild(jsonLd)
      }
      jsonLd.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: ogImage,
        url: canonical,
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.nunnarivu.ai/assets/images/logo-full.png',
          },
        },
        ...article,
      })
    } else if (jsonLd) {
      jsonLd.remove()
    }
  }, [title, description, ogImage, ogType, canonical, article])
}
