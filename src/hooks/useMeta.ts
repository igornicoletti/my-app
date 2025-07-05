import { useEffect } from 'react'

import { useCrumbs } from '@/hooks'

export const useMeta = () => {
  const crumbs = useCrumbs()
  const title = crumbs.map(c => c.name).join(' | ') || 'Home'

  useEffect(() => {
    document.title = `${title} | 2Ti`
  }, [title])

  return { title }
}
