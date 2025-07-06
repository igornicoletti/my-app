import { Helmet } from 'react-helmet-async'

import { useMetadata } from '@/hooks'

export const HelmetMetadata = () => {
  const { title, description } = useMetadata()

  const fullTitle = title ? `${title} | 2Ti` : '2Ti'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && (
        <meta name='description' content={description} />
      )}
    </Helmet>
  )
}
