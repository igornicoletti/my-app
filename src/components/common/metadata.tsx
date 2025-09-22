import { useMetadata } from '@/hooks/use-metadata'
import { Helmet } from 'react-helmet-async'

export const CommonMetadata = () => {
  const { title, description } = useMetadata()

  return (
    <Helmet>
      <title>{title ? `${title} | 2Ti` : `2Ti`}</title>
      {description && <meta name='description' content={description} />}
    </Helmet>
  )
}
