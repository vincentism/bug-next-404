/** OpenClaw「How it works」背景竖屏视频（静音循环） */
export const OPENCLAW_HOW_VIDEO_URLS = [
  'https://ik.imagekit.io/opencreator/videos/openclaw-1.mp4',
  'https://ik.imagekit.io/opencreator/videos/openclaw-2.mp4',
  'https://ik.imagekit.io/opencreator/videos/openclaw-3.mp4',
  'https://ik.imagekit.io/opencreator/videos/openclaw-4.mp4',
  'https://ik.imagekit.io/opencreator/videos/openclaw-5.mp4',
  'https://ik.imagekit.io/opencreator/videos/openclaw-6.mp4',
  'https://ik.imagekit.io/opencreator/videos/openclaw-7.mp4',
  'https://ik.imagekit.io/opencreator/videos/openclaw-8.mp4',
] as const

/**
 * 四列滚动带：每列 2 条不同素材交替循环，8 条各出现一次。
 * 列 0: 1↔5，列 1: 2↔6，列 2: 3↔7，列 3: 4↔8
 */
export const OPENCLAW_HOW_VIDEO_COLUMNS: readonly (readonly string[])[] = [
  [OPENCLAW_HOW_VIDEO_URLS[0], OPENCLAW_HOW_VIDEO_URLS[4]],
  [OPENCLAW_HOW_VIDEO_URLS[1], OPENCLAW_HOW_VIDEO_URLS[5]],
  [OPENCLAW_HOW_VIDEO_URLS[2], OPENCLAW_HOW_VIDEO_URLS[6]],
  [OPENCLAW_HOW_VIDEO_URLS[3], OPENCLAW_HOW_VIDEO_URLS[7]],
]
