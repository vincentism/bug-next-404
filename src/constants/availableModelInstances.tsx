import {
  cloudModelData,
  getLiveCloudModelData,
  type CloudModelData,
} from '@/constants/cloudModelData'
import { AvailableModels, type ModelItem } from '@/types/availablemodels'

export const availModelsData: AvailableModels = {
  text: [
    {
      id: 'google/gemini-3-flash-preview',
      name: 'Gemini 3 Flash',
      description: 'Fast and efficient with strong reasoning',
      description_zh: '快速高效，推理能力强',
      role: [0, 1, 2, 3],
    },
    {
      id: 'google/gemini-3.1-pro-preview',
      name: 'Gemini 3.1 Pro',
      description: 'Advanced intelligence with complex problem solving',
      description_zh: '高级智能，复杂问题解决能力',
      role: [0, 1, 2, 3],
      isNew: true,
    },
    {
      id: 'google/gemini-3.1-flash-lite-preview',
      name: 'Gemini 3.1 Flash Lite',
      description: 'Most cost-effective model for high volume tasks',
      description_zh: '最具性价比，适合高数据量任务',
      role: [0, 1, 2, 3],
      isNew: true,
    },
    {
      id: 'google/gemini-2.0-flash',
      name: 'Gemini 2.0 Flash',
      description: 'Fast, versatile, strong reasoning',
      description_zh: '快速、多用途、推理强',
      role: [1, 2, 3],
    },
    {
      id: 'openai/gpt-5.2-pro',
      name: 'GPT 5.2 Pro',
      description: 'Built for depth, precision, and demanding workflows.',
      description_zh: '深度强、精度高，适合复杂工作流',
      role: [1, 2, 3],
    },
    {
      id: 'openai/gpt-5.2',
      name: 'GPT 5.2',
      description: 'Built for speed, efficiency, and scale.',
      description_zh: '速度快、效率高、可扩展',
      role: [1, 2, 3],
    },
    {
      id: 'openai/gpt-5',
      name: 'GPT 5',
      description: "OpenAI's newest flagship model",
      description_zh: 'OpenAI 最新旗舰模型',
      role: [1, 2, 3],
    },
    {
      id: 'openai/gpt-4o-2024-11-20',
      name: 'GPT 4o',
      description: 'Powerful, fast, versatile for all scenarios',
      description_zh: '强大、快速、适用于所有场景',
      role: [1, 2, 3],
    },
    {
      id: 'openai/gpt-4o-mini',
      name: 'GPT 4o Mini',
      description: 'Cost-efficient, intelligent, small model',
      description_zh: '高性价比、智能小模型',
      role: [0, 1, 2, 3],
    },
  ],
  image: [
    {
      id: 'gemini-3-pro-image-preview',
      name: 'Banana Pro',
      description: "The world's strongest image editing model.",
      description_zh: '全球最强图像编辑模型',
      role: [1, 2, 3],
    },
    {
      id: 'gemini-3-pro-image-preview-vip',
      name: 'Banana Pro VIP',
      description: "The world's strongest image editing model. VIP exclusive.",
      description_zh: '全球最强图像编辑模型，VIP 专属',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/nano-banana',
      name: 'Nano Banana',
      description: "Google's new state-of-the-art model",
      description_zh: 'Google 最新顶尖模型',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/gemini-3.1-flash-image-preview',
      name: 'Nano Banana 2',
      description: "Google's fast image generation and editing model",
      description_zh: 'Google 快速图像生成与编辑模型',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/gemini-3.1-flash-image-preview-vip',
      name: 'Nano Banana 2 VIP',
      description: "Google's fast image generation model. VIP exclusive.",
      description_zh: 'Google 快速图像生成模型，VIP 专属',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/imagen4/preview',
      name: 'Imagen 4',
      description: 'Lifelike, composition & color accuracy',
      description_zh: '逼真、构图与色彩精准',
      role: [1, 2, 3],
    },
    {
      id: 'openai/gpt-image-2',
      name: 'GPT Image 2',
      description: 'Capable of creating extremely detailed images with fine typography',
      description_zh: '可生成超细节、精准排版的图像',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/gpt-image-1.5',
      name: 'GPT Image 1.5',
      description: 'High-quality generation with dynamic pricing by size & quality.',
      description_zh: '高质量生成，按尺寸和质量动态定价',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'openai/gpt-image-1',
      name: 'GPT Image 1',
      description: 'Precise, flexible, image diversity',
      description_zh: '精准、灵活、生成多样化图像',
      role: [1, 2, 3],
    },
    {
      id: 'xai/grok-imagine-image',
      name: 'Grok Imagine',
      description: 'Stunning visuals with rich aesthetics',
      description_zh: '画面精美，艺术感强',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/flux-2-pro',
      name: 'Flux 2 Pro',
      description: 'Zero-config professional image generation',
      description_zh: '零配置专业图像生成',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/flux-pro/v1.1',
      name: 'Flux 1.1 Pro',
      description: 'Super fast, image diversity',
      description_zh: '超快速、多样化图像',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/bytedance/seedream/v5/text-to-image',
      name: 'Seedream 5.0',
      description:
        'Next generation image model with web search and multi-turn editing - Coming Soon',
      description_zh: '新一代图像模型，支持联网搜索与多轮编辑 - 即将推出',
      role: [1, 2, 3],
      comingSoon: true,
    },
    {
      id: 'fal-ai/bytedance/seedream/v5/lite/text-to-image',
      name: 'Seedream 5.0 Lite',
      description: 'Fast, high quality text-to-image generation by Bytedance.',
      description_zh: '字节跳动快速高质量文生图',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/bytedance/seedream/v4.5/text-to-image',
      name: 'Seedream 4.5',
      description: 'High-quality image generation with flexible image sizes.',
      description_zh: '高质量图像生成，支持灵活尺寸',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/bytedance/seedream/v4/text-to-image',
      name: 'Seedream 4.0',
      description: 'Integrates image generation and editing functions.',
      description_zh: '集成图像生成与编辑功能',
      role: [1, 2, 3],
    },
    {
      id: 'minimax/hailuo-image-01',
      name: 'Hailuo Image 01',
      description: 'Latest, cinematic, emotional expression',
      description_zh: '最新版、电影感、情感表达',
      role: [0, 1, 2, 3],
    },
    {
      id: 'fal-ai/fast-sdxl',
      name: 'SDXL Fast',
      description: 'Speed of light, versatile',
      description_zh: '光速生成、用途广泛',
      role: [1, 2, 3],
    },

    // { id: 'dalle', name: 'Dalle 3', credits: 4 },
  ],
  video: [
    {
      id: 'fal-ai/sora-2/image-to-video',
      name: 'Sora 2',
      description: "OpenAI's most advanced video model",
      description_zh: 'OpenAI 最先进的视频模型',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/sora-2/image-to-video/pro',
      name: 'Sora 2 Pro',
      description: 'Advanced version of Sora 2, with 1080p quality',
      description_zh: 'Sora 2 进阶版，1080p 画质',
      role: [1, 2, 3],
    },
    {
      id: 'veo-3.1-fast-generate-preview/i2v',
      name: 'Veo 3.1 Fast',
      description: 'Advanced AI video with sound',
      description_zh: '带声音的先进 AI 视频',
      role: [1, 2, 3],
    },
    {
      id: 'veo-3.1-generate-preview/i2v',
      name: 'Veo 3.1',
      description: 'Advanced AI video with sound',
      description_zh: '带声音的先进 AI 视频',
      role: [1, 2, 3],
    },
    // {
    //   id: 'Fal Wan 2.5 Image To Video',
    //   name: 'Wan 2.5',
    //   credits: 1500,
    //   description: 'Faster & more cost effective Veo 3',
    //   role: [1, 2, 3],
    // },
    {
      id: 'fal-ai/veo3/fast/image-to-video',
      name: 'Veo 3 Fast',
      description: 'Faster & more cost effective Veo 3',
      description_zh: '更快更实惠的 Veo 3',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/veo3/image-to-video',
      name: 'Veo 3',
      description: 'Lifelike quality, immersive soundtrack',
      description_zh: '栩栩如生的画质，沉浸式配乐',
      role: [1, 2, 3],
    },

    {
      id: 'fal-ai/veo2/image-to-video',
      name: 'Veo 2',
      description: 'Expensive but worth it, from Google',
      description_zh: '价格高但物超所值，来自 Google',
      role: [1, 2, 3],
    },

    {
      id: 'fal-ai/kling-video/v3/standard/image-to-video',
      name: 'Kling 3.0 Standard',
      description: 'Kling 3.0 Standard image-to-video (native audio optional)',
      description_zh: 'Kling 3.0 Standard 图生视频（可选原生音频）',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/kling-video/v3/pro/image-to-video',
      name: 'Kling 3.0 Pro',
      description: 'Kling 3.0 Pro image-to-video with cinematic visuals (native audio optional)',
      description_zh: 'Kling 3.0 Pro 图生视频（电影级画质，可选原生音频）',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/kling-video/o3/standard/image-to-video',
      name: 'Kling o3 Standard',
      description: 'Kling o3 image-to-video with start/end frame control',
      description_zh: 'Kling o3 图生视频，支持首尾帧控制',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/kling-video/o3/pro/image-to-video',
      name: 'Kling o3 Pro',
      description: 'Kling o3 Pro image-to-video with start/end frame control',
      description_zh: 'Kling o3 Pro 图生视频，支持首尾帧控制',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/kling-video/v2.6/pro/image-to-video',
      name: 'Kling 2.6 Pro',
      description: "Kling's latest Pro model",
      description_zh: 'Kling 最新 Pro 模型',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/kling-video/v2.6/standard/motion-control',
      name: 'Kling 2.6 Standard Motion Control',
      description: 'Motion control (standard) - $0.07/sec',
      description_zh: '动作迁移标准档位 - $0.07/秒',
      role: [0, 1, 2, 3],
      isNew: true,
      isDisabled: true, // 专属 klingMotionControl 节点，不在通用模型选择器中显示
      pricingUnit: 'perSecond',
      pricePerSecond: '$0.07',
    },
    {
      id: 'fal-ai/kling-video/v2.6/pro/motion-control',
      name: 'Kling 2.6 Pro Motion Control',
      description: 'Motion control (pro) - $0.112/sec',
      description_zh: '动作迁移专业档位 - $0.112/秒',
      role: [1, 2, 3],
      isNew: true,
      isDisabled: true, // 专属 klingMotionControl 节点，不在通用模型选择器中显示
      pricingUnit: 'perSecond',
      pricePerSecond: '$0.112',
    },
    {
      id: 'fal-ai/kling-video/v2.5-turbo/pro/image-to-video',
      name: 'Kling 2.5 Pro',
      description: 'Professional mode, motion dynamics',
      description_zh: '专业模式、运动动态',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/kling-video/v2.1/standard/image-to-video',
      name: 'Kling 2.1 Pro',
      description: 'Professional mode, motion dynamics',
      description_zh: '专业模式、运动动态',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/kling-video/v1.6/pro/image-to-video',
      name: 'Kling 1.6',
      description: 'High quality, complex scenes',
      description_zh: '高质量、复杂场景',
      role: [0, 1, 2, 3],
    },
    {
      id: 'doubao-seedance-2-0-260128/i2v',
      name: 'Seedance 2.0',
      description: 'Next generation video model',
      description_zh: '下一代视频模型',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'doubao-seedance-2-0-fast-260128/i2v',
      name: 'Seedance 2.0 Fast',
      description: 'Faster next generation video model',
      description_zh: '更快的下一代视频模型',
      role: [1, 2, 3],
      isNew: true,
    },

    {
      id: 'fal-ai/bytedance/seedance/v1.5/pro/image-to-video',
      name: 'Seedance 1.5 Pro',
      description: 'Advanced multi-shot video with first-last frame control',
      description_zh: '先进多镜头视频，支持首尾帧控制',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'doubao-seedance-1-0-pro',
      name: 'Seedance 1.0 Pro',
      description: 'Most advanced, multi-shot, aesthetic',
      description_zh: '最先进、多镜头、美学效果',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/bytedance/seedance/v1/lite/image-to-video',
      name: 'Seedance 1.0 Lite',
      description: 'Lightweight, fast video generation',
      description_zh: '轻量级、快速视频生成',
      role: [0, 1, 2, 3],
    },

    // { id: 'Runway Gen3', name: 'Runway Gen3', credits: 25, description: 'Super fast, cinematic' },

    {
      id: 'fal-ai/minimax/hailuo-2.3/pro/image-to-video',
      name: 'Hailuo Video 2.3 Pro',
      description: 'Advanced cinematic video generation',
      description_zh: '高级电影级视频生成',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/minimax/hailuo-02/standard/image-to-video',
      name: 'Hailuo Video 02',
      description: 'Super realistic, cinematic',
      description_zh: '超写实、电影感',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/wan/v2.6/image-to-video',
      name: 'Wan 2.6',
      description: 'Latest Wan model, enhanced quality & flexible parameters',
      description_zh: '最新 Wan 模型，增强画质与灵活参数',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/wan-25-preview/image-to-video',
      name: 'Wan 2.5',
      description: 'Latest Wan model, enhanced quality',
      description_zh: '最新 Wan 模型，增强画质',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/wan/v2.2-a14b/image-to-video',
      name: 'Wan 2.2',
      description: 'High quality image to video generation',
      description_zh: '高质量图生视频',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/vidu/q3/image-to-video',
      name: 'Vidu Q3',
      description: 'Image to video with audio generation support',
      description_zh: '图生视频，支持音视频生成',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'gen4_turbo',
      name: 'Runway Gen-4',
      description: 'Super fast, cinematic',
      description_zh: '超快速、电影感',
      role: [1, 2, 3],
    },
    {
      id: 'ray-2',
      name: 'Luma Ray 2',
      description: 'Fast, realistic visuals, natural motion',
      description_zh: '快速、逼真画面、自然运动',
      role: [1, 2, 3],
    },
    {
      id: 'xai/grok-imagine-video/image-to-video',
      name: 'Grok Imagine Video',
      description: 'Cinematic video with immersive audio',
      description_zh: '电影级画质，沉浸式音效',
      role: [1, 2, 3],
      isNew: true,
    },
  ],
  DescribeImage: [
    {
      id: 'google/gemini-3.1-pro-preview',
      name: 'Gemini 3.1 Pro',
      description: 'Advanced intelligence with complex problem solving',
      description_zh: '高级智能，复杂问题解决能力',
      role: [0, 1, 2, 3],
      isNew: true,
    },
    {
      id: 'openai/gpt-4o-2024-11-20',
      name: 'GPT 4o',
      description: 'Powerful, fast, versatile for all scenarios',
      description_zh: '强大、快速、适用于所有场景',
      role: [0, 1, 2, 3],
    },
    {
      id: 'openai/gpt-5-mini',
      name: 'GPT 5 Mini',
      description: 'Faster, more efficient version of GPT 5',
      description_zh: '更快更高效的 GPT 5',
      role: [1, 2, 3],
    },
    {
      id: 'openai/gpt-5',
      name: 'GPT 5',
      description: "OpenAI's newest flagship model",
      description_zh: 'OpenAI 最新旗舰模型',
      role: [1, 2, 3],
    },

    // { id: 'gemini2', name: 'Gemini2', credits: 16 },
  ],
  textToVideo: [
    {
      id: 'fal-ai/sora-2/text-to-video',
      name: 'Sora 2',
      description: "OpenAI's most advanced video model",
      description_zh: 'OpenAI 最先进的视频模型',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/sora-2/text-to-video/pro',
      name: 'Sora 2 Pro',
      description: 'Advanced version of Sora 2, with 1080p quality',
      description_zh: 'Sora 2 进阶版，1080p 画质',
      role: [1, 2, 3],
    },
    {
      id: 'veo-3.1-fast-generate-preview',
      name: 'Veo 3.1 Fast',
      description: 'Advanced Al video with sound',
      description_zh: '带声音的先进 AI 视频',
      role: [1, 2, 3],
    },
    {
      id: 'veo-3.1-generate-preview',
      name: 'Veo 3.1',
      description: 'Advanced Al video with sound',
      description_zh: '带声音的先进 AI 视频',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/veo3/fast',
      name: 'Veo 3 Fast',
      description: 'Faster & more cost effective Veo 3',
      description_zh: '更快更实惠的 Veo 3',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/veo3',
      name: 'Veo 3',
      description: 'Lifelike quality, immersive soundtrack',
      description_zh: '栩栩如生的画质，沉浸式配乐',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/kling-video/o3/pro/text-to-video',
      name: 'Kling o3 Pro',
      description: 'Kling o3 Pro text-to-video with realistic video generation',
      description_zh: 'Kling o3 Pro 文生视频，真实视频生成',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/kling-video/v3/pro/text-to-video',
      name: 'Kling 3.0 Pro',
      description: 'Kling 3.0 Pro text-to-video with cinematic visuals (native audio optional)',
      description_zh: 'Kling 3.0 Pro 文生视频（电影级画质，可选原生音频）',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/kling-video/v3/standard/text-to-video',
      name: 'Kling 3.0 Standard',
      description:
        'Kling 3.0 Standard text-to-video with cinematic visuals (native audio optional)',
      description_zh: 'Kling 3.0 Standard 文生视频（可选原生音频）',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/kling-video/v2.6/pro/text-to-video',
      name: 'Kling 2.6 Pro',
      description: "Kling's latest Pro text-to-video model",
      description_zh: 'Kling 最新 Pro 文生视频模型',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'doubao-seedance-2-0-260128',
      name: 'Seedance 2.0',
      description: 'Next generation text-to-video',
      description_zh: '下一代文本生成视频',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'doubao-seedance-2-0-fast-260128',
      name: 'Seedance 2.0 Fast',
      description: 'Faster next generation text-to-video',
      description_zh: '更快的下一代文本生成视频',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/bytedance/seedance/v1.5/pro/text-to-video',
      name: 'Seedance 1.5 Pro',
      description: 'Advanced AI video generation from text',
      description_zh: '先进的文本生成视频',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/bytedance/seedance/v1/lite/text-to-video',
      name: 'Seedance 1.0 Lite',
      description: 'Lightweight, fast video generation',
      description_zh: '轻量级、快速视频生成',
      role: [0, 1, 2, 3],
    },
    {
      id: 'wan/v2.6/text-to-video',
      name: 'Wan 2.6',
      description: 'Latest Wan model, enhanced quality & flexible parameters',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/vidu/q3/text-to-video',
      name: 'Vidu Q3',
      description: 'Latest Vidu model with audio generation support',
      description_zh: '最新 Vidu 模型，支持音视频生成',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/minimax/hailuo-02/standard/text-to-video',
      name: 'Hailuo Video 02',
      description: 'Super realistic, cinematic',
      description_zh: '超写实、电影感',
      role: [0, 1, 2, 3],
    },

    {
      id: 'xai/grok-imagine-video/text-to-video',
      name: 'Grok Imagine Video',
      description: 'Vivid storytelling with built-in soundtrack',
      description_zh: '生动叙事，自带配乐',
      role: [1, 2, 3],
      isNew: true,
    },
  ],
  imageToImage: [
    {
      id: 'gemini-3-pro-image-preview',
      name: 'Banana Pro',
      description: "The world's strongest image editing model.",
      description_zh: '全球最强图像编辑模型',
      role: [1, 2, 3],
    },
    {
      id: 'gemini-3-pro-image-preview-vip',
      name: 'Banana Pro VIP',
      description: "The world's strongest image editing model. VIP exclusive.",
      description_zh: '全球最强图像编辑模型，VIP 专属',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/nano-banana/edit',
      name: 'Nano Banana',
      description: 'Google new state-of-the-art model',
      description_zh: 'Google 最新顶尖模型',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/gemini-3.1-flash-image-preview/edit',
      name: 'Nano Banana 2',
      description: "Google's fast image editing model",
      description_zh: 'Google 快速图像编辑模型',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/gemini-3.1-flash-image-preview-vip/edit',
      name: 'Nano Banana 2 VIP',
      description: "Google's fast image editing model. VIP exclusive.",
      description_zh: 'Google 快速图像编辑模型，VIP 专属',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'openai/gpt-image-2/edit',
      name: 'GPT Image 2',
      description: 'Capable of creating extremely detailed images with fine typography',
      description_zh: '可生成超细节、精准排版的图像',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/gpt-image-1.5/edit',
      name: 'GPT Image 1.5',
      description: 'Image editing with dynamic pricing by size & quality.',
      description_zh: '图像编辑，按尺寸和质量动态定价',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'openai/gpt-image-1',
      name: 'GPT Image 1',
      description: 'Precise, flexible, image diversity',
      description_zh: '精准、灵活、生成多样化图像',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/flux-pro/kontext/multi',
      name: 'Flux Kontext',
      description: 'Precise, scene-level editing',
      description_zh: '精准、场景级编辑',
      role: [1, 2, 3],
      model_key: 'fal-ai/flux-pro/kontext',
    },
    {
      id: 'fal-ai/flux-2-pro/edit',
      name: 'Flux 2 Pro',
      description: 'Exceptional photorealism and artistic editing',
      description_zh: '卓越的照片级真实感与艺术编辑',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/gemini-flash-edit/multi',
      name: 'Gemini 2.0 Flash',
      description: 'Realistic, detailed, accurate',
      description_zh: '写实、细节丰富、精准',
      role: [0, 1, 2, 3],
    },
    {
      id: 'fal-ai/qwen-image-edit-plus',
      name: 'Qwen Image Edit',
      description: 'Superior text editing',
      description_zh: '卓越的文字编辑能力',
      role: [1, 2, 3],
    },
    {
      id: 'fal-ai/bytedance/seedream/v5/edit',
      name: 'Seedream 5.0',
      description:
        'Next generation image editing with web search and multi-turn editing - Coming Soon',
      description_zh: '新一代图像编辑，支持联网搜索与多轮编辑 - 即将推出',
      role: [1, 2, 3],
      comingSoon: true,
    },
    {
      id: 'fal-ai/bytedance/seedream/v5/lite/edit',
      name: 'Seedream 5.0 Lite',
      description: 'Fast, high quality image editing by Bytedance.',
      description_zh: '字节跳动快速高质量图像编辑',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/bytedance/seedream/v4.5/edit',
      name: 'Seedream 4.5',
      description: 'Image editing with flexible image sizes.',
      description_zh: '图像编辑，支持灵活尺寸',
      role: [1, 2, 3],
      isNew: true,
    },
    {
      id: 'fal-ai/bytedance/seedream/v4/edit',
      name: 'Seedream 4.0',
      description: 'Integrates image generation and editing functions.',
      description_zh: '集成图像生成与编辑功能',
      role: [1, 2, 3],
    },
    {
      id: 'xai/grok-imagine-image/edit',
      name: 'Grok Imagine',
      description: 'Accurate editing with style preservation',
      description_zh: '精准编辑，风格保持',
      role: [1, 2, 3],
      isNew: true,
    },
  ],
  imageAngleControl: [
    {
      id: 'fal-ai/qwen-image-edit-2511-multiple-angles',
      name: 'Qwen Image Edit Multiple Angles',
      description: 'Generate the same scene from new angles',
      description_zh: '从不同角度生成同一场景',
      role: [1, 2, 3],
      isNew: true,
    },
  ],
  videoLipSync: [
    {
      id: 'fal-ai/pixverse/lipsync',
      name: 'Pixverse Lipsync',
      description: 'Realistic, high quality lipsync model',
      description_zh: '逼真、高质量对口型模型',
      role: [0, 1, 2, 3],
    },
    {
      id: 'fal-ai/sync-lipsync/v2',
      name: 'Sync. Lipsync 2.0',
      description: 'Fast, high quality lipsync model',
      description_zh: '快速、高质量对口型模型',
      role: [1, 2, 3],
    },
    // {
    //   id: 'opencreator/infinitalk/video-to-video',
    //   name: 'Infinite Talk',
    //   credits: 720,
    //   description: '',
    //   description_zh: '',
    //   role: [0, 1, 2, 3],
    // },
  ],
  relight: [
    {
      id: 'gemini-3-pro-image-preview',
      name: 'Banana Pro',
      description: 'AI-powered relighting with dynamic pricing by resolution.',
      description_zh: 'AI 智能重打光，按分辨率动态定价',
      role: [1, 2, 3],
    },
  ],
}

for (const list of Object.values(availModelsData)) {
  for (const model of list) {
    const cloud = cloudModelData[model.id]
    if (cloud && cloud.pricing !== undefined) {
      model.cloudPricing = cloud.pricing
    }
    if (cloud?.display_name) {
      model.display_name = cloud.display_name
    }
  }
}

const enrichModelWithCloudData = (
  model: ModelItem,
  cloudData: CloudModelData
): ModelItem => {
  const cloud = cloudData[model.id]
  if (!cloud) {
    return model
  }

  const nextModel: ModelItem = { ...model }
  let changed = false

  if (cloud.pricing !== undefined && nextModel.cloudPricing !== cloud.pricing) {
    nextModel.cloudPricing = cloud.pricing
    changed = true
  }

  if (cloud.display_name && nextModel.display_name !== cloud.display_name) {
    nextModel.display_name = cloud.display_name
    changed = true
  }

  return changed ? nextModel : model
}

export const getEnrichedAvailableModels = (cloudData: CloudModelData): AvailableModels => {
  const enriched: AvailableModels = {}

  for (const [type, models] of Object.entries(availModelsData)) {
    enriched[type] = models.map(model => enrichModelWithCloudData(model, cloudData))
  }

  return enriched
}

/** 旧 ID → 新 ID 映射，用于兼容旧 workflow 数据 */
const LEGACY_ID: Record<string, string> = {
  'Gemini 3 Pro': 'google/gemini-3-flash-preview',
  'Gemini 3 Flash': 'google/gemini-3-flash-preview',
  'Gemini 3.1 Pro': 'google/gemini-3.1-pro-preview',
  'Gemini 3.1 Flash Lite': 'google/gemini-3.1-flash-lite-preview',
  'Gemini 2.0 Flash': 'google/gemini-2.0-flash',
  'GPT-5.2 Pro': 'openai/gpt-5.2-pro',
  'GPT-5.2': 'openai/gpt-5.2',
  'GPT-5': 'openai/gpt-5',
  'GPT-4o': 'openai/gpt-4o-2024-11-20',
  'GPT-4o Mini': 'openai/gpt-4o-mini',
  'GPT-5 Mini': 'openai/gpt-5-mini',
  Grok2: 'xai/grok2',
  'google/gemini-3.0-flash-image': 'fal-ai/nano-banana',
  'Fal Nano Banana': 'fal-ai/nano-banana',
  'Fal Imagen 4': 'fal-ai/imagen4/preview',
  'Fal_GPT_Image_1.5_Text_to_Image': 'fal-ai/gpt-image-1.5',
  'GPT Image 1': 'openai/gpt-image-1',
  'Fal Grok Imagine Image': 'xai/grok-imagine-image',
  'Fal Flux 2 Pro': 'fal-ai/flux-2-pro',
  'Flux 1.1 Pro': 'fal-ai/flux-pro/v1.1',
  Fal_Seedream_V5_Text_to_Image: 'fal-ai/bytedance/seedream/v5/text-to-image',
  'Fal_Seedream_V4.5_Text_to_Image': 'fal-ai/bytedance/seedream/v4.5/text-to-image',
  'Fal Seedream V4 Text to Image': 'fal-ai/bytedance/seedream/v4/text-to-image',
  'Hailuo Image 01': 'minimax/hailuo-image-01',
  'SDXL Fast': 'fal-ai/fast-sdxl',
  'google/gemini-3.0-flash-image/edit': 'fal-ai/nano-banana/edit',
  'Fal Nano Banana Edit': 'fal-ai/nano-banana/edit',
  'Fal_GPT_Image_1.5_Image_to_Image': 'fal-ai/gpt-image-1.5/edit',
  'Fal Flux Pro Kontext': 'fal-ai/flux-pro/kontext/multi',
  'Fal Flux 2 Pro Edit': 'fal-ai/flux-2-pro/edit',
  'Fal Gemini 2.0 Flash Edit': 'fal-ai/gemini-flash-edit/multi',
  'Fal Qwen Image Edit': 'fal-ai/qwen-image-edit-plus',
  Fal_Seedream_V5_Image_to_Image: 'fal-ai/bytedance/seedream/v5/edit',
  'Fal_Seedream_V4.5_Image_to_Image': 'fal-ai/bytedance/seedream/v4.5/edit',
  'Fal Seedream V4 Image to Image': 'fal-ai/bytedance/seedream/v4/edit',
  'Fal Grok Imagine Image Edit': 'xai/grok-imagine-image/edit',
  'opencreator-fal-sora2-i2v-v1': 'fal-ai/sora-2/image-to-video',
  'opencreator-fal-sora2-pro-i2v-v1': 'fal-ai/sora-2/image-to-video/pro',
  'google/veo3.1-fast/image-to-video': 'veo-3.1-fast-generate-preview/i2v',
  'google/veo3.1/image-to-video': 'veo-3.1-generate-preview/i2v',
  'Fal Veo3 Fast Image To Video': 'fal-ai/veo3/fast/image-to-video',
  'Fal Veo 3 Image To Video': 'fal-ai/veo3/image-to-video',
  'Fal kling 3.0 Standard Image to Video': 'fal-ai/kling-video/v3/standard/image-to-video',
  'Fal kling 3.0 Pro Image to Video': 'fal-ai/kling-video/v3/pro/image-to-video',
  'Fal kling o3 Standard Image to Video': 'fal-ai/kling-video/o3/standard/image-to-video',
  'Fal kling o3 Pro Image to Video': 'fal-ai/kling-video/o3/pro/image-to-video',
  'Fal kling 2.6 Pro Image to Video': 'fal-ai/kling-video/v2.6/pro/image-to-video',
  'opencreator/kling/v2.6/standard/motion-control':
    'fal-ai/kling-video/v2.6/standard/motion-control',
  'opencreator/kling/v2.6/pro/motion-control': 'fal-ai/kling-video/v2.6/pro/motion-control',
  'Fal kling 2.5 Pro': 'fal-ai/kling-video/v2.5-turbo/pro/image-to-video',
  'Fal kling 2.1 Pro': 'fal-ai/kling-video/v2.1/standard/image-to-video',
  'Fal kling 2.1 Master': 'fal-ai/kling-video/v2.1/master/image-to-video',
  'Kling 2.0 Master': 'fal-ai/kling-video/v2/master/image-to-video',
  'Kling 1.6 Pro': 'fal-ai/kling-video/v1.6/pro/image-to-video',
  'Kling 1.6': 'fal-ai/kling-video/v1.6/pro/image-to-video',
  'Fal Seedance 1.0 Lite Image to Video': 'fal-ai/bytedance/seedance/v1/lite/image-to-video',
  'fal-hailuo-2.3-image2video': 'fal-ai/minimax/hailuo-2.3/pro/image-to-video',
  'Fal Wan 2.6 Image to Video': 'fal-ai/wan/v2.6/image-to-video',
  'Fal Wan 2.5 Image to Video': 'fal-ai/wan-25-preview/image-to-video',
  'Fal Wan v2.2 Image to Video': 'fal-ai/wan/v2.2-a14b/image-to-video',
  'Fal Wan v2.2 LoRA Image to Video': 'fal-ai/wan/v2.2-a14b/image-to-video/lora',
  'Fal Vidu Q3 Image to Video': 'fal-ai/vidu/q3/image-to-video',
  'Fal Grok Imagine Video I2V': 'xai/grok-imagine-video/image-to-video',
  'opencreator/fal/sora2/t2v/v1': 'fal-ai/sora-2/text-to-video',
  'opencreator/fal/sora2-pro/t2v/v1': 'fal-ai/sora-2/text-to-video/pro',
  'google/veo3.1-fast': 'veo-3.1-fast-generate-preview',
  'google/veo3.1': 'veo-3.1-generate-preview',
  'Fal-Veo-Fast': 'fal-ai/veo3/fast',
  'Fal Veo 3': 'fal-ai/veo3',
  'Fal kling o3 Pro Text to Video': 'fal-ai/kling-video/o3/pro/text-to-video',
  'Fal kling 3.0 Pro Text to Video': 'fal-ai/kling-video/v3/pro/text-to-video',
  'Fal kling 3.0 Standard Text to Video': 'fal-ai/kling-video/v3/standard/text-to-video',
  'Fal Wan 2.6 Text to Video': 'wan/v2.6/text-to-video',
  'Fal Vidu Q3 Text to Video': 'fal-ai/vidu/q3/text-to-video',
  'Fal Seedance 1.0 Lite Text to Video': 'fal-ai/bytedance/seedance/v1/lite/text-to-video',
  'doubao-seedance-2-0': 'doubao-seedance-2-0-260128/i2v',
  'doubao-seedance-2-0-t2v': 'doubao-seedance-2-0-260128',
  'doubao-seedance-2-0-fast': 'doubao-seedance-2-0-fast-260128/i2v',
  'doubao-seedance-2-0-fast-t2v': 'doubao-seedance-2-0-fast-260128',
  'Fal Grok Imagine Video T2V': 'xai/grok-imagine-video/text-to-video',
  'Fal Pixverse Lipsync': 'fal-ai/pixverse/lipsync',
  'Fal Sync Lipsync V2': 'fal-ai/sync-lipsync/v2',
  'opencreator/qwen/image-edit-multiple-angles': 'fal-ai/qwen-image-edit-2511-multiple-angles',
  'Fal Infinitalk Image Audio To Video': 'fal-ai/infinitalk',
  'fal-ai/infinitalk/video-to-video': 'fal-ai/infinitalk',
  'kie/infinitalk/from-audio': 'fal-ai/infinitalk',
  'Fish Audio TTS': 'fish-audio/speech-1.6',
  'ElevenLabs v2': 'fal-ai/elevenlabs/tts/multilingual-v2',
  'MiniMax Speech 2.8 HD': 'fal-ai/minimax/speech-2.8-hd',
  'MiniMax Speech 2.8 Turbo': 'fal-ai/minimax/speech-2.8-turbo',
  'opencreator/qwen3/tts/clone-voice': 'fal-ai/qwen-3-tts/clone-voice/1.7b',
  'opencreator/minimax/voice-clone': 'fal-ai/minimax/voice-clone',
  'opencreator/kling/o1/video-to-video': 'fal-ai/kling-video/o1/video-to-video',
  'opencreator/kling/o1/video_to_video/edit': 'fal-ai/kling-video/o1/video-to-video/edit',
  'opencreator/kling/o1/video_to_video/reference': 'fal-ai/kling-video/o1/video-to-video/reference',
  'opencreator/kling/o3/video-to-video': 'fal-ai/kling-video/o3/standard/video-to-video',
  'fal-hailuo-2.0-text2video': 'fal-ai/minimax/hailuo-02/standard/text-to-video',
  'Fal kling 2.6 Pro Text to Video': 'fal-ai/kling-video/v2.6/pro/text-to-video',
  'fal-ai/wan/v2.6/text-to-video': 'wan/v2.6/text-to-video',
  'doubao-seedance-1-5-pro': 'fal-ai/bytedance/seedance/v1.5/pro/image-to-video',
  'fal-hailuo-2.0-image2video': 'fal-ai/minimax/hailuo-02/standard/image-to-video',
  'Runway Gen4 turbo': 'gen4_turbo',
  'Luma Ray 2': 'ray-2',
  'Veo 2': 'fal-ai/veo2/image-to-video',
}

/*  根据model id获取 model详细信息 */
export const getModelsById = (id: string, node_type?: string) => {
  const rid = LEGACY_ID[id] ?? id

  if (node_type) {
    const list = availModelsData[node_type]
    if (list) {
      for (const model of list) {
        if (model.id === rid) {
          return enrichModelWithCloudData(model, getLiveCloudModelData())
        }
      }
    }
  }

  for (const type in availModelsData) {
    if (node_type && node_type === type) {
    }
    for (const model of availModelsData[type]) {
      if (model.id === rid) {
        return enrichModelWithCloudData(model, getLiveCloudModelData())
      }
    }
  }

  return null
}

