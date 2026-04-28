import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/out/**',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
    ],
  },
  {
    rules: {
      // 国际化路由限制
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/link',
              message: '请使用 @/i18n/routing 中的 Link 组件以支持国际化路由。',
            },
            {
              name: 'next/navigation',
              importNames: ['useRouter', 'usePathname', 'redirect'],
              message: '请使用 @/i18n/routing 中的路由函数以支持国际化路由。',
            },
          ],
        },
      ],
      // TypeScript 规则
      '@typescript-eslint/no-explicit-any': 'warn', // 改为警告而非错误
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          'ts-ignore': 'allow-with-description',
          'ts-expect-error': 'allow-with-description',
          minimumDescriptionLength: 3,
        },
      ],
      // React Hooks 规则 - 放宽一些限制
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      // React Compiler 规则 - 这些是实验性的，放宽限制
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/refs': 'off',
      // Next.js 规则 - 对于特定场景放宽
      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
      // React 规则
      'react/no-unescaped-entities': 'warn',
      'react/display-name': 'warn', // 组件显示名称改为警告
      'react/jsx-key': 'error', // 保持 key 为错误
      'import/no-anonymous-default-export': 'warn',
      // JSX a11y
      'jsx-a11y/alt-text': 'warn',
      // 其他规则
      'prefer-const': 'warn', // 改为警告
    },
  },
]

export default eslintConfig
