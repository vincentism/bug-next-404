'use client'

import React from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from '@/i18n/client'
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'

const FEATURED_TEMPLATES = [
  {
    title: 'Virtual Try On',
    href: '/template-virtual-try-on',
    image: 'https://ik.imagekit.io/opencreator/images/20251222/785afbbf-1870-49fd-8c9d-7c549cf0d674-20251222-1766381348050.png',
  },
  {
    title: 'Product Infographics',
    href: '/template-product-infographics',
    image: 'https://ik.imagekit.io/opencreator/images/result-XvtajZFc-oJFJoh2bBJVP5WdTsvEdr_O.png',
  },
  {
    title: 'AI Video Ads',
    href: '/template-one-click-commercial-product-ads',
    image: 'https://ik.imagekit.io/opencreator/images/result-gnTN-g1pST2YIFlrD3_jVafTofamgBoI.png',
  },
  {
    title: 'Storyboard Builder',
    href: '/template-storyboard-builder',
    image: 'https://ik.imagekit.io/opencreator/images/image_20251215_07045557-4b5d-428d-b7e4-9499ad01488c.png',
  },
] as const

export function TemplatesCarousel() {
  const t = useTranslations('landing.templatesCarousel')

  return (
    <section className="relative w-full px-4 py-14 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="mb-3 text-3xl font-poller-one text-black md:text-4xl lg:text-5xl">
            {t('titlePrefix')} <span className="text-[#1fde1f]">{t('titleHighlight')}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base">{t('description')}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {FEATURED_TEMPLATES.map(template => (
            <Link
              key={template.href}
              href={template.href}
              className="group overflow-hidden rounded-3xl border-2 border-black bg-white shadow-[0_10px_0_#000] transition hover:-translate-y-1"
            >
              <img
                src={getCdnImageUrlWithSize(template.image, 520, 520)}
                alt={template.title}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="font-bold text-black group-hover:text-[#148f14]">{template.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
