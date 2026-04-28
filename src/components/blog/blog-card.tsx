'use client'

import React, { memo, useMemo } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { BlogPostMeta } from '@/lib/blog'
import { getImageKitImageUrlWithSize } from '@/lib/image-cdn'

interface BlogCardProps {
  post: BlogPostMeta
}

export const BlogCard = memo(function BlogCard({ post }: BlogCardProps) {
  const formattedDate = useMemo(
    () =>
      new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    [post.date]
  )

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full bg-white border border-gray-200 rounded-xl p-4 md:p-5 hover:border-gray-300 transition-colors">
        <div className="flex items-start gap-4">
          {post.coverImage ? (
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              <Image
                src={getImageKitImageUrlWithSize(post.coverImage, 160, 160)}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 64px, 80px"
              />
            </div>
          ) : (
            <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg bg-gray-100 border border-gray-200" />
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-base md:text-lg font-semibold text-gray-900 leading-snug group-hover:text-theme-pink transition-colors line-clamp-2">
              {post.title}
            </h3>

            {post.description ? (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {post.description}
              </p>
            ) : null}

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-theme-pink">
                Read
                <span className="inline-flex group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
})
