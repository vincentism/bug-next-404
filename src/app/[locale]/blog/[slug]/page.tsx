import type { Metadata } from 'next'
import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { LandingNavbar, LandingFooter, LandingCTA } from '@/components/landing'
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog'
import { locales } from '@/i18n/config'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { getImageKitImageUrlWithSize } from '@/lib/image-cdn'

const BlogContent = dynamic(() =>
  import('@/components/blog/blog-content').then(mod => ({ default: mod.BlogContent }))
)

interface BlogPostPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const allParams: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    const slugs = getAllBlogSlugs(locale)
    slugs.forEach(slug => {
      allParams.push({ locale, slug })
    })
  }

  return allParams
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const post = getBlogPostBySlug(slug, locale)

  if (!post) {
    return {
      title: 'Post Not Found | OpenCreator Blog',
    }
  }

  return {
    title: `${post.title} | OpenCreator Blog`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params
  const post = getBlogPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-white">
      <LandingNavbar />

      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>

          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight leading-snug">
              {post.title}
            </h1>

            {post.description ? (
              <p className="mt-3 text-base text-gray-600 leading-relaxed">{post.description}</p>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-700">{post.author}</span>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                {post.readTime}
              </span>
            </div>
          </header>

          {post.coverImage ? (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 border border-gray-200 mb-10">
              <Image
                src={getImageKitImageUrlWithSize(post.coverImage, 1280, 720)}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="bg-white">
            <BlogContent content={post.content} />
          </div>
        </div>
      </section>

      <LandingCTA />

      <LandingFooter />
    </div>
  )
}
