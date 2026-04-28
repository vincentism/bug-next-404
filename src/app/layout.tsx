import type { Metadata } from 'next'
import { Instrument_Serif, JetBrains_Mono, Poller_One, Roboto } from 'next/font/google'
import React from 'react'
import Script from 'next/script'
import { cookies } from 'next/headers'
import { ImageKitProvider } from '@imagekit/next'
import '../../styles/globals.css'
import { JsonLd } from '@/components/seo/json-ld'
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  createSchemaGraph,
  getSiteUrl,
} from '@/lib/seo/schema'
import { REGION_COOKIE_NAME, getIsChinaFromCookieValue } from '@/lib/region'
import { IMAGEKIT_URL_ENDPOINT } from '@/lib/image-cdn'

const PollerOne = Poller_One({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-poller-one',
  fallback: ['system-ui', 'sans-serif'],
})

const RobotoFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  preload: true,
  variable: '--font-robote',
  fallback: ['system-ui', 'arial'],
})

const InstrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
  fallback: ['Times New Roman', 'serif'],
})

const JetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
})

// Noto Sans SC 仅在中文 locale 下由 [locale]/layout 加载，非中文用户不预加载
const siteUrl = getSiteUrl()

const organizationSchema = buildOrganizationSchema({
  url: siteUrl,
  name: 'OpenCreator',
  logoUrl: `${siteUrl}/favicon.ico`,
})

const websiteSchema = buildWebSiteSchema({
  url: siteUrl,
  name: 'OpenCreator',
})

const globalSchemaGraph = createSchemaGraph([organizationSchema, websiteSchema])

export const metadata: Metadata = {
  title: 'OpenCreator',
  description: 'Unified Gen-AI Workstation For Content Creators',
  keywords: [
    'OpenCreator',
    'AI content creation',
    'AI video generator',
    'AI image generator',
    'AI video editor',
    'AI workflow templates',
    'content creator tools',
    'YouTube video generator',
    'short-form video generator',
    'AI design tools',
  ],
  // 确保 manifest 与 PWA 相关资源始终走站点主域名（避免被 CDN assetPrefix 覆盖）
  metadataBase: new URL(siteUrl),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', media: '(prefers-color-scheme: light)' },
      { url: '/favicon_dark.ico', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/icons/logo_512.png', sizes: '512x512', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'OpenCreator',
  },
  openGraph: {
    title: 'OpenCreator',
    description: 'Unified Gen-AI Workstation For Content Creators',
    url: siteUrl,
    siteName: 'OpenCreator',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OpenCreator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenCreator',
    description: 'Unified Gen-AI Workstation For Content Creators',
    images: ['/og-image.jpg'],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const isChina = getIsChinaFromCookieValue(cookieStore.get(REGION_COOKIE_NAME)?.value)

  return (
    <html
      translate="no"
      className={`${RobotoFont.variable} ${PollerOne.variable} ${JetBrainsMono.variable} ${InstrumentSerif.variable}`}
      style={
        {
          inset: 0,
          padding: 0,
          marign: 0,
          fontFamily: RobotoFont.style.fontFamily,
          '--font-poller-one': PollerOne.style.fontFamily,
          '--font-jetbrains-mono': JetBrainsMono.style.fontFamily,
          '--font-instrument-serif': InstrumentSerif.style.fontFamily,
          '--font-outfit': RobotoFont.style.fontFamily,
          '--font-noto-sans-sc': RobotoFont.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <head>
        {/* DNS prefetch for critical third-party domains */}
        <link rel="dns-prefetch" href="//ik.imagekit.io" />
        <link rel="dns-prefetch" href="//clerk.com" />
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ik.imagekit.io/opencreator" crossOrigin="anonymous" />
        {!isChina && (
          <>
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
            <link rel="dns-prefetch" href="//ph.opencreator.io" />
          </>
        )}
        <meta name="baidu-site-verification" content="codeva-lDM2dSyMte" />
        <meta name="google" content="notranslate" />
        <JsonLd id="global-schema" data={globalSchemaGraph} />
        {/* Google Tag Manager - 中国地区不加载（被 GFW 封锁，会 hang 到超时） */}
        {!isChina && (
          <Script
            async
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TG9LHX38');
            `,
            }}
          />
        )}
        {!isChina && (
          <Script
            id="cio-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
              var _cio = _cio || [];
              (function() {
                var a,b,c;a=function(f){return function(){_cio.push([f].concat(Array.prototype.slice.call(arguments,0)))}};
                b=["load","identify","sidentify","track","page","on","off"];
                for(c=0;c<b.length;c++){_cio[b[c]]=a(b[c])};
                var t=document.createElement('script'),s=document.getElementsByTagName('script')[0];
                t.async=true;t.id='cio-tracker';
                t.setAttribute('data-site-id','c02f67d23e0245e3a5ee');
                t.setAttribute('data-use-array-params','true');
                t.setAttribute('data-auto-track-page','true');
                t.src='https://assets.customer.io/assets/track.js';
                s.parentNode.insertBefore(t,s);
              })();
            `,
            }}
          />
        )}
      </head>
      <body
        style={{
          margin: 0,
        }}
        className={'bg-white relative flex flex-col p-0 m-0!'}
      >
        {/* GTM noscript fallback */}
        {!isChina && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TG9LHX38"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
        )}

        <ImageKitProvider urlEndpoint={IMAGEKIT_URL_ENDPOINT}>{children}</ImageKitProvider>

        {/* rewardful affiliates - 中国地区不加载（海外联盟营销，已有安全兜底） */}
        {!isChina && (
          <>
            <Script id="rewardful-queue" strategy="lazyOnload">
              {`(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`}
            </Script>
            <Script
              src="https://r.wdfl.co/rw.js"
              data-rewardful="e526e8"
              strategy="lazyOnload"
            ></Script>
          </>
        )}
      </body>
    </html>
  )
}
