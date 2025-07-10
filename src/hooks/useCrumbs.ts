import { useMatches, type UIMatch } from 'react-router-dom'

type Handle = {
  crumb?: string | ((params: Record<string, string | undefined>) => string)
}

type CrumbItem = {
  name: string
  path: string
  isCurrent: boolean
}

export const useCrumbs = (): CrumbItem[] => {
  const matches = useMatches() as Array<UIMatch & { handle?: Handle }>

  return matches
    .map((match, index, all) => {
      const crumb = match.handle?.crumb
      if (!crumb) return null

      return {
        name: typeof crumb === 'function' ? crumb(match.params) : crumb,
        path: match.pathname,
        isCurrent: index === all.length - 1,
      } satisfies CrumbItem
    })
    .filter(Boolean) as CrumbItem[]
}
