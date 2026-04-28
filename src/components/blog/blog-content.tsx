'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Link } from '@/i18n/navigation'
import { AtomCard } from '@/components/blog/atom-card'
import { getImageKitImageUrl, getImageKitVideoUrl } from '@/lib/image-cdn'

export interface BlogContentProps {
  content: string
}

const markdownRemarkPlugins = [remarkGfm]
const markdownRehypePlugins = [rehypeRaw]

const markdownComponents: Components = {
  video: ({ src, ...props }) => {
    const videoSrc = typeof src === 'string' ? getImageKitVideoUrl(src) : src
    return (
      <video
        {...props}
        src={videoSrc}
        controls
        className="w-full max-w-[640px] mx-auto my-6 rounded-xl border border-gray-200 bg-black/5 shadow-sm"
      />
    )
  },
  pre: ({ children, node, ...props }) => {
    // Check if this is an atom code block by looking at the code element's className
    const codeElement = node?.children?.[0]
    if (codeElement && codeElement.type === 'element') {
      const rawClassName = codeElement.properties?.className
      const codeClassName = Array.isArray(rawClassName)
        ? rawClassName.join(' ')
        : typeof rawClassName === 'string'
          ? rawClassName
          : undefined
      if (codeElement.tagName === 'code' && codeClassName?.includes('language-atom')) {
        // Return children directly without pre wrapper
        return <>{children}</>
      }
    }
    return <pre {...props}>{children}</pre>
  },
  a: ({ href, children }) => {
    const className =
      'text-theme-pink font-medium underline underline-offset-4 decoration-[1.5px] hover:text-theme-pink/80 transition-colors'

    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  },
  code: ({ className, children }) => {
    const language = className?.match(/language-(\w+)/)?.[1]
    const isInline = !className
    if (!isInline && language === 'atom') {
      return <AtomCard content={String(children)} data-atom-card />
    }
    return <code className={className}>{children}</code>
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null
    return (
      <span className="my-6 md:my-8 relative flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getImageKitImageUrl(src)}
          alt={alt || ''}
          className="rounded-xl border border-gray-200 max-w-full w-auto max-h-[520px] object-contain shadow-sm"
        />
      </span>
    )
  },
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-gray-200 bg-gray-50 px-4 md:px-5 py-3 md:py-4 rounded-md my-6 text-[15px] leading-relaxed text-gray-800">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="not-prose overflow-x-auto my-6 border border-gray-200 rounded-lg bg-white">
      <table className="w-full text-left border-collapse text-[14px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
  th: ({ children }) => (
    <th className="p-3 md:p-4 text-xs md:text-sm font-semibold text-gray-700 border-b border-gray-200">
      {children}
    </th>
  ),
  tbody: ({ children }) => <tbody className="bg-white">{children}</tbody>,
  tr: ({ children }) => <tr className="even:bg-gray-50">{children}</tr>,
  td: ({ children }) => (
    <td className="p-3 md:p-4 border-b border-gray-100 text-[14px] text-gray-700">
      {children}
    </td>
  ),
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <article
      className="prose max-w-3xl mx-auto
      prose-headings:text-gray-900 prose-headings:font-semibold
      prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:leading-snug prose-h1:mt-4 prose-h1:mb-6
      prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
      prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4 prose-p:text-[15px]
      prose-a:text-theme-pink prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4 prose-a:font-medium
      prose-strong:text-gray-900 prose-strong:font-semibold
      prose-ul:my-4 prose-ul:pl-5
      prose-ol:my-4 prose-ol:pl-5
      prose-li:my-1 prose-li:text-[15px]
      prose-hr:my-10 prose-hr:border-gray-200
      prose-blockquote:my-6
      prose-code:bg-gray-100 prose-code:text-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[13px] prose-code:font-mono
      prose-pre:bg-[#0B1020] prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-900/60 prose-pre:rounded-xl prose-pre:py-4 prose-pre:px-5 prose-pre:my-6 prose-pre:text-[13px] prose-pre:leading-relaxed
      prose-img:rounded-xl prose-img:border prose-img:border-gray-200 prose-img:shadow-sm prose-img:my-6"
    >
      <ReactMarkdown
        remarkPlugins={markdownRemarkPlugins}
        rehypePlugins={markdownRehypePlugins}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
