import React from 'react'
import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export type LegalMarkdownProps = {
  markdownRelativePath: string
  className?: string
}

function loadMarkdown(markdownRelativePath: string): string {
  const filePath = path.join(process.cwd(), markdownRelativePath)
  const raw = fs.readFileSync(filePath, 'utf-8')

  // 去掉可选的 YAML frontmatter（用于 privacy-policy 等）
  return raw.replace(/^---[\s\S]*?---\n/, '')
}

export function LegalMarkdown({ markdownRelativePath, className }: LegalMarkdownProps) {
  const markdownContent = loadMarkdown(markdownRelativePath)

  const baseClass = 'prose prose-base p-6'
  const finalClassName = className ? `${baseClass} ${className}` : baseClass

  return (
    <div
      className={finalClassName}
      style={{
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-gray-900" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-lg md:text-xl font-semibold mt-6 mb-3 text-gray-900" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="text-base md:text-lg font-semibold mt-5 mb-3 text-gray-900" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="mb-4 text-gray-700 leading-relaxed text-base" {...props} />
          ),
          a: ({ ...props }) => (
            <a
              className="text-blue-600 hover:text-blue-800 underline break-words transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          li: ({ ...props }) => <li className="mb-1" {...props} />,
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  )
}
