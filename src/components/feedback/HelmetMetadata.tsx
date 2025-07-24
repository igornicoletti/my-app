import { Helmet } from 'react-helmet-async'

import { useMetadata } from '@/hooks'

export const HelmetMetadata = () => {
  const { title, description } = useMetadata()

  return (
    <Helmet>
      <title>{title ? `${title} | 2Ti` : `2Ti`}</title>
      {description && <meta name='description' content={description} />}
    </Helmet>
  )
}
