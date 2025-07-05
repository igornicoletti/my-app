import { useMatches, type UIMatch } from 'react-router-dom'

type Handle = {
  crumb?: string | ((params: Record<string, string | undefined>) => string)
}

export type Crumb = {
  name: string
  path: string
  isCurrent: boolean
}

export const useCrumbs = (): Crumb[] => {
  const matches = useMatches() as Array<UIMatch & { handle?: Handle }>

  return matches.map((match, index, arr) => {
    const crumb = match.handle?.crumb

    if (!crumb) return null

    const name = typeof crumb === 'function' ? crumb(match.params) : crumb

    return {
      name,
      path: match.pathname,
      isCurrent: index === arr.length - 1
    } satisfies Crumb
  }).filter(Boolean) as Crumb[]
}
