import BrandLogoIcon from '@/assets/icons/brand-logo.svg'

const PageLoading = () => {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center z-20 bg-white">
      <div className="animate-spin rounded-full h-12 w-12 origin-center flex items-center justify-center">
        <BrandLogoIcon className="min-w-[22px] min-h-[22px] w-[32px] h-[32px] origin-center" />
      </div>
    </div>
  )
}

export default PageLoading
