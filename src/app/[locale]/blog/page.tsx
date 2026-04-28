import type { Metadata } from 'next'
import React from 'react'
import { LandingNavbar, LandingFooter } from '@/components/landing'
import { BlogCard } from '@/components/blog'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | OpenCreator - AI Workflow Insights & Tutorials',
  description:
    'Discover the latest insights, tutorials, and updates about AI-powered content creation. Learn how to supercharge your creative workflow with OpenCreator.',
  keywords: [
    'AI blog',
    'content creation tips',
    'AI workflow tutorials',
    'video generation guide',
    'image generation tips',
    'OpenCreator blog',
  ],
}

type BlogPageProps = {
  params: Promise<{
    locale: string
  }>
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params
  const posts = getAllBlogPosts(locale)

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-white">
      <LandingNavbar />

      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-900 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-theme-pink" />
              OpenCreator Blog
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight leading-snug">
              Blog
            </h1>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {posts.map(post => (
                <BlogCard key={`${post.locale}-${post.slug}`} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16">
              <p className="text-gray-500">No blog posts yet.</p>
            </div>
          )}
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
