import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { getCdnImageUrlWithSize } from '@/lib/image-cdn'
import { ArrowRight } from 'lucide-react'

export interface RelatedSolutionItem {
  href: string
  title: string
  description: string
  image: string
}

interface RelatedSolutionsProps {
  title: string
  subtitle?: string
  items: RelatedSolutionItem[]
  ctaLabel?: string
}

export function RelatedSolutions({ title, subtitle, items, ctaLabel }: RelatedSolutionsProps) {
  const finalCtaLabel = ctaLabel ?? 'Learn more'

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poller-one text-black mb-3">{title}</h2>
          {subtitle && (
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Solutions Grid - Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-4 scrollbar-hide snap-x snap-mandatory">
          {items.map(item => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="group flex-shrink-0 w-[280px] md:w-auto snap-start"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={getCdnImageUrlWithSize(item.image, 800, 800)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                  <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-[#1fde1f] transition-colors">
                    <span>{finalCtaLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
