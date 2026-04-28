// Solutions data shared between navbar and solution pages
export const SOLUTION_ITEMS = [
  {
    href: '/solutions/ecommerce-product-images',
    titleKey: 'solutionItems.ecommerceProductImages',
    descKey: 'solutionDescriptions.ecommerceProductImages',
    image:
      'https://ik.imagekit.io/opencreator/images/image_20251210_eba33028-026f-44fa-80b4-4440ab5a06ce.png',
  },
  {
    href: '/solutions/ai-fashion',
    titleKey: 'solutionItems.aiFashion',
    descKey: 'solutionDescriptions.aiFashion',
    image: 'https://ik.imagekit.io/opencreator/web/xm/1127-templates-image/Batch AI Model Try-On.png',
  },
  {
    href: '/solutions/ai-portrait',
    titleKey: 'solutionItems.aiPortrait',
    descKey: 'solutionDescriptions.aiPortrait',
    image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/LinkedIn Headshot.png',
  },
  {
    href: '/solutions/ai-video',
    titleKey: 'solutionItems.aiVideo',
    descKey: 'solutionDescriptions.aiVideo',
    image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Image to Video.png',
  },
  {
    href: '/solutions/ai-design',
    titleKey: 'solutionItems.aiDesign',
    descKey: 'solutionDescriptions.aiDesign',
    image: 'https://ik.imagekit.io/opencreator/web/xm/1119-templates-refresh/Image Upscale.png',
  },
] as const

export type SolutionItem = (typeof SOLUTION_ITEMS)[number]
