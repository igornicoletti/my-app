import { useMatches, type UIMatch } from 'react-router-dom'

type Handle = {
  crumb?: string | ((params: Record<string, string | undefined>) => string)
}

type Crumbs = {
  name: string
  path: string
  isCurrent: boolean
}

export const useCrumbs = (): Crumbs[] => {
  const matches = useMatches() as Array<UIMatch & { handle?: Handle }>

  return matches.map((match, index, arr) => {
    const crumb = match.handle?.crumb

    if (!crumb) return null

    return {
      name: typeof crumb === 'function' ? crumb(match.params) : crumb,
      path: match.pathname,
      isCurrent: index === arr.length - 1
    } satisfies Crumbs
  }).filter(Boolean) as Crumbs[]
}
