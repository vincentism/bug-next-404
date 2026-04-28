/**
 * Workflow Scenes Data for Landing Page Demo
 *
 * Each scene represents a different workflow template with:
 * - Simplified node structure for animation
 * - Result images from actual workflow outputs
 * - Scene-specific titles and descriptions
 */

export interface WorkflowSceneNode {
  id: string
  type: string
  label: string
  inputHint: string
  inputText?: string
  imageBase64?: string
  selectedModels?: string[]
}

export interface WorkflowSceneEdge {
  id: string
  source: string
  sourceHandle: string
  target: string
  targetHandle: string
}

export interface WorkflowSceneData {
  id: string
  title: string
  nodes: WorkflowSceneNode[]
  edges: WorkflowSceneEdge[]
}

/**
 * Scene 1: Amazon Product Photo Set
 * Product Image → Remove BG → Describe → Generate Prompts → Split → Batch Generate 6 E-commerce Photos
 */
const amazonPhotoSetScene: WorkflowSceneData = {
  id: 'amazon-photo-set',
  title: 'Product Photography',
  nodes: [
    {
      id: 'imageInput-1',
      type: 'imageInput',
      label: 'Product Image',
      inputHint: 'Product Reference',
      imageBase64:
        'https://ik.imagekit.io/opencreator/images/ff519ff8-41ac-41a4-ab5e-fa3544b318e6-20251102-1762093166781.png',
    },
    {
      id: 'textInput-1',
      type: 'textInput',
      label: 'Product Name',
      inputHint: 'Product Name',
      inputText: 'yellow lingerie set',
    },
    {
      id: 'imageToImage-1',
      type: 'imageToImage',
      label: 'Remove BG',
      inputHint: 'Clean Product',
      inputText:
        'Remove the background from this product image, keep only the product with transparent background.',
      selectedModels: ['Fal Nano Banana Edit'],
    },
    {
      id: 'textGenerator-1',
      type: 'textGenerator',
      label: 'Describe Product',
      inputHint: 'Image Describer',
      inputText:
        'Describe this product in detail including its color, material, style, and key features for e-commerce listing.',
      selectedModels: ['GPT-4o'],
    },
    {
      id: 'textGenerator-2',
      type: 'textGenerator',
      label: 'Generate Prompts',
      inputHint: 'Prompt Generator',
      inputText:
        'Based on the product description, generate 6 different e-commerce photo prompts: lifestyle shot, detail close-up, size guide, feature highlight, benefit showcase, and packaging display.',
      selectedModels: ['GPT-4o'],
    },
    {
      id: 'scriptSplit-1',
      type: 'scriptSplit',
      label: 'Split Prompts',
      inputHint: 'Text Splitter',
      inputText: 'Split the 6 prompts into separate items for batch processing.',
      selectedModels: ['GPT-4o'],
    },
    {
      id: 'imageToImage-out',
      type: 'imageToImage',
      label: 'Batch Generate',
      inputHint: '6 E-commerce Photos',
      inputText:
        'Generate professional e-commerce product photos based on each prompt, maintaining consistent product appearance and high-quality studio lighting.',
      selectedModels: ['Fal Nano Banana Edit'],
    },
  ],
  edges: [
    {
      id: 'e1',
      source: 'imageInput-1',
      sourceHandle: 'image',
      target: 'imageToImage-1',
      targetHandle: 'image',
    },
    {
      id: 'e2',
      source: 'imageToImage-1',
      sourceHandle: 'image',
      target: 'textGenerator-1',
      targetHandle: 'image',
    },
    {
      id: 'e3',
      source: 'textGenerator-1',
      sourceHandle: 'text',
      target: 'textGenerator-2',
      targetHandle: 'text',
    },
    {
      id: 'e4',
      source: 'textGenerator-2',
      sourceHandle: 'text',
      target: 'scriptSplit-1',
      targetHandle: 'text',
    },
    {
      id: 'e5',
      source: 'scriptSplit-1',
      sourceHandle: 'text',
      target: 'imageToImage-out',
      targetHandle: 'text',
    },
    {
      id: 'e6',
      source: 'imageToImage-1',
      sourceHandle: 'image',
      target: 'imageToImage-out',
      targetHandle: 'image',
    },
  ],
}

/**
 * Scene 2: All-Things Wearable
 * Product Name + Model Photo + Product Photo → Try-On Effect → Multi-Angle Photos
 */
const allThingsWearableScene: WorkflowSceneData = {
  id: 'all-things-wearable',
  title: 'Model Try-on',
  nodes: [
    {
      id: 'textInput-name',
      type: 'textInput',
      label: 'Product Name',
      inputHint: 'e.g. Glasses',
      inputText: 'Glasses',
    },
    {
      id: 'imageInput-model',
      type: 'imageInput',
      label: 'Model Photo',
      inputHint: 'Upload Model',
      imageBase64: 'https://ik.imagekit.io/opencreator/uploads/qOclO0ymO5.jpg',
    },
    {
      id: 'imageInput-product',
      type: 'imageInput',
      label: 'Product Photo',
      inputHint: 'Upload Product',
      imageBase64:
        'https://ik.imagekit.io/opencreator/images/f5b2aa34-80bc-43fa-8973-9be488415caa-20251204-1764830084900.png',
    },
    {
      id: 'textGenerator-prompt',
      type: 'textGenerator',
      label: 'Generate Prompt',
      inputHint: 'Wearing Instruction',
      inputText:
        'Generate a detailed instruction for how to naturally place this accessory on the model, considering proper positioning, angle, and realistic integration.',
      selectedModels: ['Gemini 3 Flash'],
    },
    {
      id: 'imageToImage-tryon',
      type: 'imageToImage',
      label: 'Try-On Effect',
      inputHint: 'Wearing Result',
      inputText:
        'Place the product naturally on the model following the wearing instruction. Ensure realistic shadows, reflections, and seamless integration.',
      selectedModels: ['Fal Gemini 2.0 Flash Edit'],
    },
    {
      id: 'scriptSplit-angles',
      type: 'scriptSplit',
      label: 'Split Angles',
      inputHint: 'Pose Instructions',
      inputText:
        'Generate 4 different pose instructions: front view, left profile, right profile, and three-quarter angle.',
      selectedModels: ['GPT-4o'],
    },
    {
      id: 'imageToImage-multi',
      type: 'imageToImage',
      label: 'Multi-Angle Photos',
      inputHint: '4 Angle Shots',
      inputText:
        'Generate the model wearing the product from different angles based on the pose instruction, maintaining consistent appearance and lighting.',
      selectedModels: ['Fal Gemini 2.0 Flash Edit'],
    },
  ],
  edges: [
    {
      id: 'e1',
      source: 'textInput-name',
      sourceHandle: 'text',
      target: 'textGenerator-prompt',
      targetHandle: 'text',
    },
    {
      id: 'e2',
      source: 'imageInput-model',
      sourceHandle: 'image',
      target: 'imageToImage-tryon',
      targetHandle: 'image',
    },
    {
      id: 'e3',
      source: 'imageInput-product',
      sourceHandle: 'image',
      target: 'imageToImage-tryon',
      targetHandle: 'image',
    },
    {
      id: 'e4',
      source: 'textGenerator-prompt',
      sourceHandle: 'text',
      target: 'imageToImage-tryon',
      targetHandle: 'text',
    },
    {
      id: 'e5',
      source: 'textInput-name',
      sourceHandle: 'text',
      target: 'scriptSplit-angles',
      targetHandle: 'text',
    },
    {
      id: 'e6',
      source: 'scriptSplit-angles',
      sourceHandle: 'text',
      target: 'imageToImage-multi',
      targetHandle: 'text',
    },
    {
      id: 'e7',
      source: 'imageToImage-tryon',
      sourceHandle: 'image',
      target: 'imageToImage-multi',
      targetHandle: 'image',
    },
  ],
}

/**
 * Scene 3: Sora 2 x UGC Promo
 * Product Image + Influencer Style → Script Generation → UGC Video
 */
const sora2UgcScene: WorkflowSceneData = {
  id: 'sora2-ugc',
  title: 'UGC Video',
  nodes: [
    {
      id: 'textInput-style',
      type: 'textInput',
      label: 'Influencer Style',
      inputHint: 'Style Description',
      inputText: 'skincare influencer, Californian girl, gen z vibes',
    },
    {
      id: 'imageInput-product',
      type: 'imageInput',
      label: 'Product Image',
      inputHint: 'Product Photo',
      imageBase64:
        'https://ik.imagekit.io/opencreator/images/fe1fcf2e-92f1-48b5-93bb-dd6a3157ce62-20251103-1762170821082.png',
    },
    {
      id: 'imageToImage-clean',
      type: 'imageToImage',
      label: 'Clean Product',
      inputHint: 'Remove Background',
      inputText: 'Remove background and clean up the product image for video integration.',
      selectedModels: ['Fal Nano Banana Edit'],
    },
    {
      id: 'textGenerator-describe',
      type: 'textGenerator',
      label: 'Describe Product',
      inputHint: 'Product Details',
      inputText:
        'Analyze this skincare product and describe its key benefits, ingredients, and unique selling points for social media content.',
      selectedModels: ['GPT-4o'],
    },
    {
      id: 'textGenerator-script',
      type: 'textGenerator',
      label: 'UGC Script',
      inputHint: 'Video Script',
      inputText:
        'Write a 15-second authentic UGC-style video script featuring an influencer naturally showcasing and recommending this product. Include casual dialogue, product demonstration, and a call-to-action.',
      selectedModels: ['GPT-4o'],
    },
    {
      id: 'videoMaker-ugc',
      type: 'videoMaker',
      label: 'UGC Video',
      inputHint: 'Sora 2 Video',
      inputText:
        'Create a vertical 9:16 UGC-style video of a young influencer authentically reviewing and demonstrating the skincare product in a casual bedroom setting with natural lighting.',
      selectedModels: ['opencreator-fal-sora2-i2v-v1'],
    },
  ],
  edges: [
    {
      id: 'e1',
      source: 'imageInput-product',
      sourceHandle: 'image',
      target: 'imageToImage-clean',
      targetHandle: 'image',
    },
    {
      id: 'e2',
      source: 'imageToImage-clean',
      sourceHandle: 'image',
      target: 'textGenerator-describe',
      targetHandle: 'image',
    },
    {
      id: 'e3',
      source: 'textInput-style',
      sourceHandle: 'text',
      target: 'textGenerator-script',
      targetHandle: 'text',
    },
    {
      id: 'e4',
      source: 'textGenerator-describe',
      sourceHandle: 'text',
      target: 'textGenerator-script',
      targetHandle: 'text',
    },
    {
      id: 'e5',
      source: 'textGenerator-script',
      sourceHandle: 'text',
      target: 'videoMaker-ugc',
      targetHandle: 'text',
    },
    {
      id: 'e6',
      source: 'imageToImage-clean',
      sourceHandle: 'image',
      target: 'videoMaker-ugc',
      targetHandle: 'image',
    },
  ],
}

/**
 * Scene 5: Cinematic TVC
 * Product Image → 9-Grid Storyboard → TVC Ad Video
 */
const cinematicTvcScene: WorkflowSceneData = {
  id: 'cinematic-tvc',
  title: 'Cinematic TVC',
  nodes: [
    {
      id: 'imageInput-product',
      type: 'imageInput',
      label: 'Product Image',
      inputHint: 'Product Photo',
      imageBase64: 'https://ik.imagekit.io/opencreator/uploads/2D7ZfUwY42.png',
    },
    {
      id: 'imageToImage-storyboard',
      type: 'imageToImage',
      label: 'Storyboard',
      inputHint: '9-Grid Storyboard',
      inputText:
        'You are a professional TVC storyboard artist. The product in the image is the main product for this TVC ad. Please design a dramatic story showcasing the ultimate deliciousness of food. Create a 9-grid storyboard in black and white sketch style while maintaining product consistency.',
      selectedModels: ['google/gemini-3.0-flash-image/edit'],
    },
    {
      id: 'videoMaker-tvc',
      type: 'videoMaker',
      label: 'TVC Video',
      inputHint: 'Cinematic Ad',
      inputText:
        'You are a professional TV commercial director. Using the 9 storyboard frames, create a 12-second cinematic TV commercial video. The protagonist is a black-haired Asian young man. Tell a highly creative story with Chinese voiceover, maintain product consistency, and use realistic live-action style throughout.',
      selectedModels: ['opencreator-fal-sora2-pro-i2v-v1'],
    },
  ],
  edges: [
    {
      id: 'e1',
      source: 'imageInput-product',
      sourceHandle: 'image',
      target: 'imageToImage-storyboard',
      targetHandle: 'image',
    },
    {
      id: 'e2',
      source: 'imageToImage-storyboard',
      sourceHandle: 'image',
      target: 'videoMaker-tvc',
      targetHandle: 'image',
    },
  ],
}

/**
 * Scene 4: Haute Adornment Studio
 * Earring Image + Model Photo → Try-On Effect → Multi-Angle Photos + Videos
 */
const hauteAdornmentStudioScene: WorkflowSceneData = {
  id: 'haute-adornment-studio',
  title: 'Fashion Brand Video',
  nodes: [
    {
      id: 'imageInput-earring',
      type: 'imageInput',
      label: 'Earring Image',
      inputHint: 'Product Photo',
      imageBase64:
        'https://ik.imagekit.io/opencreator/images/2ec44e03-8d80-4ebd-9817-7f9a140f1e41-20251126-1764170316924.png',
    },
    {
      id: 'imageInput-model',
      type: 'imageInput',
      label: 'Model Reference',
      inputHint: 'Model Photo',
      imageBase64:
        'https://ik.imagekit.io/opencreator/images/eae6b487-70f0-466f-88dd-3a59d5d7fbb6-20251126-1764170327672.jpeg',
    },
    {
      id: 'imageToImage-wearing',
      type: 'imageToImage',
      label: 'Model Wearing',
      inputHint: 'Try-On Effect',
      inputText:
        'Place the elegant earring naturally on the model, ensuring realistic positioning, proper scale, and beautiful light reflections on the jewelry.',
      selectedModels: ['google/gemini-3.0-flash-image/edit'],
    },
    {
      id: 'imageToImage-pose',
      type: 'imageToImage',
      label: 'Pose Adjust',
      inputHint: 'Angle Change',
      inputText:
        'Adjust the model pose to a three-quarter angle view, highlighting the earring with elegant neck positioning and soft lighting.',
      selectedModels: ['google/gemini-3.0-flash-image/edit'],
    },
    {
      id: 'videoMaker-1',
      type: 'videoMaker',
      label: 'Static Video',
      inputHint: 'Breathing Feel',
      inputText:
        'Create a subtle breathing motion video with the model gently moving, earring catching light naturally, cinematic fashion brand aesthetic.',
      selectedModels: ['doubao-seedance-1-0-pro'],
    },
    {
      id: 'videoMaker-2',
      type: 'videoMaker',
      label: 'Light Flow',
      inputHint: 'Light Effect',
      inputText:
        'Generate a video with dynamic light flowing across the earring, creating sparkle and shimmer effects, luxury jewelry advertisement style.',
      selectedModels: ['doubao-seedance-1-0-pro'],
    },
    {
      id: 'videoMaker-3',
      type: 'videoMaker',
      label: 'Close-up',
      inputHint: 'Earring Detail',
      inputText:
        'Create an extreme close-up video of the earring with slow camera movement, showcasing intricate details, craftsmanship, and material quality.',
      selectedModels: ['Fal kling 2.1 Pro'],
    },
  ],
  edges: [
    {
      id: 'e1',
      source: 'imageInput-earring',
      sourceHandle: 'image',
      target: 'imageToImage-wearing',
      targetHandle: 'image',
    },
    {
      id: 'e2',
      source: 'imageInput-model',
      sourceHandle: 'image',
      target: 'imageToImage-wearing',
      targetHandle: 'image',
    },
    {
      id: 'e3',
      source: 'imageToImage-wearing',
      sourceHandle: 'image',
      target: 'imageToImage-pose',
      targetHandle: 'image',
    },
    {
      id: 'e4',
      source: 'imageToImage-wearing',
      sourceHandle: 'image',
      target: 'videoMaker-1',
      targetHandle: 'image',
    },
    {
      id: 'e5',
      source: 'imageToImage-pose',
      sourceHandle: 'image',
      target: 'videoMaker-2',
      targetHandle: 'image',
    },
    {
      id: 'e6',
      source: 'imageToImage-pose',
      sourceHandle: 'image',
      target: 'videoMaker-3',
      targetHandle: 'image',
    },
  ],
}

// Export all scenes
// Order: 1. Product Photography; 2. Model Try-on; 3. UGC Video; 4. Fashion Brand Video; 5. Cinematic TVC
export const WORKFLOW_SCENES_DATA: WorkflowSceneData[] = [
  amazonPhotoSetScene, // Product Photography
  allThingsWearableScene, // Model Try-on
  sora2UgcScene, // UGC Video
  hauteAdornmentStudioScene, // Fashion Brand Video
  cinematicTvcScene, // Cinematic TVC
]

export default WORKFLOW_SCENES_DATA
