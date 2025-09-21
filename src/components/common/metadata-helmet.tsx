import { useMetadataHelmet } from '@/hooks/use-metadata-helmet'
import { Helmet } from 'react-helmet-async'

export const MetadataHelmet = () => {
  const { title, description } = useMetadataHelmet()

  return (
    <Helmet>
      <title>{title ? `${title} | 2Ti` : `2Ti`}</title>
      {description && <meta name='description' content={description} />}
    </Helmet>
  )
}
