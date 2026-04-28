import type { Metadata } from 'next'
import { LandingNavbar, LandingFAQ, LandingFooter } from '@/components/landing'
import OffModalTips from '@/components/dialog/off_modal_tips'
import { ModelHero, ModelFeatures, ModelSpecs, ModelPricing } from '@/components/landing/model'
import { AutoPlayVideo } from '@/components/landing/auto-play-video'
import { JsonLd } from '@/components/seo/json-ld'
import {
  createSchemaGraph,
  buildWebPageSchema,
  buildFaqPageSchema,
  buildSoftwareApplicationSchema,
  getSiteUrl,
} from '@/lib/seo/schema'
import { getTranslations } from '@/i18n/get-translations'
import type { FAQItem } from '@/components/landing/faq'
import { AtSign, Clock3, Film, Images, Music, Scissors, type LucideIcon } from 'lucide-react'

type PageProps = {
  params: Promise<{ locale: string }>
}

const HERO_VIDEO_URL = 'https://ik.imagekit.io/opencreator/videos/zCMfL-tGEL.mp4'

const WORKFLOW_CARDS: Array<{
  key: 'entry' | 'assets' | 'addressing' | 'editing'
  icon: LucideIcon
}> = [
    { key: 'entry', icon: Film },
    { key: 'assets', icon: Images },
    { key: 'addressing', icon: AtSign },
    { key: 'editing', icon: Scissors },
  ]

const MODE_ITEMS = ['firstLast', 'allInOne'] as const

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.seedance20.model.meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'Seedance 2.0',
      'ByteDance Seedance',
      'Seedance AI video model',
      'multimodal video model',
      'text to video AI',
      'image to video AI',
      'AI video generation',
      'OpenCreator Seedance',
    ],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  }
}

export default async function Seedance20ModelPage({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'models.seedance20.model' })
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}/${locale}/models/seedance-2-0`

  const showcaseItems = [
    {
      src: 'https://ik.imagekit.io/opencreator/videos/zCMfL-tGEL.mp4',
      title: t('showcase.items.streetDance.title'),
      description: t('showcase.items.streetDance.description'),
      useCase: t('showcase.items.streetDance.useCase'),
    },
    {
      src: 'https://ik.imagekit.io/opencreator/videos/DkPgbtIV0x.mp4',
      title: t('showcase.items.relationshipDrama.title'),
      description: t('showcase.items.relationshipDrama.description'),
      useCase: t('showcase.items.relationshipDrama.useCase'),
    },
    {
      src: 'https://ik.imagekit.io/opencreator/videos/tqCPA29wsP.mp4',
      title: t('showcase.items.musicMV.title'),
      description: t('showcase.items.musicMV.description'),
      useCase: t('showcase.items.musicMV.useCase'),
    },
    {
      src: 'https://ik.imagekit.io/opencreator/videos/4ZMy2vsApd.mp4',
      title: t('showcase.items.wuxiaDuel.title'),
      description: t('showcase.items.wuxiaDuel.description'),
      useCase: t('showcase.items.wuxiaDuel.useCase'),
    },
    {
      src: 'https://ik.imagekit.io/opencreator/videos/fHASGPEizl.mp4',
      title: t('showcase.items.monsterInvasion.title'),
      description: t('showcase.items.monsterInvasion.description'),
      useCase: t('showcase.items.monsterInvasion.useCase'),
    },
    {
      src: 'https://ik.imagekit.io/opencreator/videos/5AM7PI2127.mp4',
      title: t('showcase.items.cinematicTransition.title'),
      description: t('showcase.items.cinematicTransition.description'),
      useCase: t('showcase.items.cinematicTransition.useCase'),
    },
  ]

  const heroData = {
    modelName: t('hero.modelName'),
    tagline: t('hero.tagline'),
    description: t('hero.description'),
    heroVideo: HERO_VIDEO_URL,
    capabilities: [
      t('hero.capabilities.textImageVideo'),
      t('hero.capabilities.referenceControl'),
      t('hero.capabilities.motionConsistency'),
      t('hero.capabilities.multiCamera'),
      t('hero.capabilities.comingSoon'),
    ],
    badge: t('hero.badge'),
    ctaText: t('hero.ctaText'),
    ctaLink: '/pricing',
    secondaryCtaText: t('hero.secondaryCtaText'),
  }

  const features = [
    {
      title: t('features.items.textImageVideo.title'),
      description: t('features.items.textImageVideo.description'),
    },
    {
      title: t('features.items.multimodalReference.title'),
      description: t('features.items.multimodalReference.description'),
    },
    {
      title: t('features.items.motionConsistency.title'),
      description: t('features.items.motionConsistency.description'),
    },
    {
      title: t('features.items.continuation.title'),
      description: t('features.items.continuation.description'),
    },
    {
      title: t('features.items.editableWorkflow.title'),
      description: t('features.items.editableWorkflow.description'),
    },
    {
      title: t('features.items.storytelling.title'),
      description: t('features.items.storytelling.description'),
    },
  ]

  const specs = [
    {
      title: t('specs.categories.inputLimit.title'),
      items: [
        { label: t('specs.categories.inputLimit.imageInput'), value: t('specs.values.imageInput') },
        { label: t('specs.categories.inputLimit.videoInput'), value: t('specs.values.videoInput') },
        { label: t('specs.categories.inputLimit.audioInput'), value: t('specs.values.audioInput') },
        {
          label: t('specs.categories.inputLimit.mixedFiles'),
          value: t('specs.values.mixedFiles'),
        },
      ],
    },
    {
      title: t('specs.categories.generation.title'),
      items: [
        {
          label: t('specs.categories.generation.duration'),
          value: t('specs.values.generationDuration'),
        },
        {
          label: t('specs.categories.generation.outputFormat'),
          value: t('specs.values.outputFormat'),
        },
        {
          label: t('specs.categories.generation.aspectRatio'),
          value: t('specs.values.aspectRatio'),
        },
      ],
    },
    {
      title: t('specs.categories.controls.title'),
      items: [
        { label: t('specs.categories.controls.entryModes'), value: t('specs.values.entryModes') },
        {
          label: t('specs.categories.controls.materialAddressing'),
          value: t('specs.values.materialAddressing'),
        },
        {
          label: t('specs.categories.controls.videoExtension'),
          value: t('specs.values.videoExtension'),
        },
        {
          label: t('specs.categories.controls.timelineEditing'),
          value: t('specs.values.timelineEditing'),
        },
      ],
    },
    {
      title: t('specs.categories.quality.title'),
      items: [
        {
          label: t('specs.categories.quality.motionStability'),
          value: t('specs.values.motionStability'),
        },
        {
          label: t('specs.categories.quality.characterConsistency'),
          value: t('specs.values.characterConsistency'),
        },
        {
          label: t('specs.categories.quality.audioVisualSync'),
          value: t('specs.values.audioVisualSync'),
        },
      ],
    },
  ]

  const faqItems: FAQItem[] = Array.from({ length: 6 }).map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))

  const promptLines = Array.from({ length: 4 }).map((_, index) =>
    t(`workflow.promptBlueprint.lines.${index}`)
  )

  const schemaData = createSchemaGraph([
    buildWebPageSchema({
      url: pageUrl,
      name: t('meta.title'),
      description: t('meta.description'),
    }),
    buildSoftwareApplicationSchema({
      url: pageUrl,
      name: 'Seedance 2.0',
      description: t('meta.description'),
      applicationCategory: 'MultimediaApplication',
    }),
    buildFaqPageSchema({
      url: pageUrl,
      name: 'Seedance 2.0 FAQ',
      faqItems,
    }),
  ])

  return (
    <>
      <OffModalTips />
      <JsonLd data={schemaData} />
      <LandingNavbar />

      <main>
        <ModelHero {...heroData} />

        <section className="py-12 md:py-16 lg:py-20 bg-[#090E1A]">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-8 md:mb-10 max-w-3xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-white mb-2">
                {t('showcase.title')}
              </h2>
              <p className="text-sm md:text-base text-slate-300">{t('showcase.subtitle')}</p>
            </div>

            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
              {showcaseItems.map(item => (
                <article
                  key={item.src}
                  className="group relative overflow-hidden rounded-2xl border border-white/20 aspect-[3/4]"
                >
                  <AutoPlayVideo src={item.src} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="inline-flex items-center rounded-full border border-white/30 bg-black/30 px-2.5 py-1 text-[11px] uppercase tracking-wide text-[#A7F3D0]">
                      {item.description}
                    </p>
                    <h3 className="mt-2 text-xl md:text-2xl font-poller-one text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs md:text-sm text-slate-200 max-w-2xl">
                      {item.useCase}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-[#F3F8FF]">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-8 md:mb-10 max-w-3xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-poller-one text-black mb-2">
                {t('workflow.title')}
              </h2>
              <p className="text-sm md:text-base text-gray-600">{t('workflow.subtitle')}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {WORKFLOW_CARDS.map(({ key, icon: Icon }) => (
                    <article
                      key={key}
                      className="rounded-2xl border-2 border-black bg-white p-5 shadow-[6px_6px_0px_#000]"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black bg-[#EAF5FF]">
                        <Icon className="h-5 w-5 text-black" />
                      </div>
                      <h3 className="text-lg font-poller-one text-black mb-1">
                        {t(`workflow.cards.${key}.title`)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {t(`workflow.cards.${key}.description`)}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-5">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                    {t('workflow.modeTitle')}
                  </p>
                  <div className="space-y-3">
                    {MODE_ITEMS.map(mode => (
                      <div
                        key={mode}
                        className="rounded-xl border border-black/10 bg-[#F8FAFC] p-3"
                      >
                        <p className="font-semibold text-black text-sm">
                          {t(`workflow.modes.${mode}.title`)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {t(`workflow.modes.${mode}.description`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="rounded-2xl border-2 border-black bg-[#0F172A] text-[#A7F3D0] p-5 shadow-[6px_6px_0px_#000]">
                <div className="flex items-center gap-2 mb-4">
                  <Clock3 className="h-4 w-4" />
                  <p className="text-xs uppercase tracking-wide text-[#94A3B8]">
                    {t('workflow.promptBlueprint.title')}
                  </p>
                </div>
                <div className="space-y-2 font-mono text-xs leading-relaxed md:text-sm">
                  {promptLines.map(line => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-[#334155] bg-[#111827] p-3">
                  <p className="text-[11px] md:text-xs text-[#CBD5E1]">
                    {t('workflow.promptBlueprint.note')}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] md:text-xs text-[#94A3B8]">
                  <Music className="h-4 w-4" />
                  <span>{t('workflow.audioHint')}</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <ModelFeatures
          title={t('features.title')}
          subtitle={t('features.subtitle')}
          features={features}
        />

        <ModelSpecs title={t('specs.title')} subtitle={t('specs.subtitle')} categories={specs} />

        <ModelPricing
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
          modelId=""
          modelName="Seedance 2.0"
          description={t('pricing.description')}
          note={t('pricing.note')}
          viewFullPricingText={t('pricing.viewFullPricing')}
          ctaText={t('pricing.ctaText')}
          ctaLink="/pricing"
          comingSoon={true}
          comingSoonText={t('pricing.comingSoonBadge')}
        />

        <LandingFAQ title={t('faq.title')} items={faqItems} />
      </main>

      <LandingFooter />
    </>
  )
}
