import originalConfig from './next.config.original'
import type { NextConfig } from 'next'

const config: NextConfig = {
  ...originalConfig as any,
  images: {
    ...(originalConfig as any)?.images,
    loader: 'custom',
    loaderFile: './.edgeone/image-loader.mjs',
  },
};

export default config;
