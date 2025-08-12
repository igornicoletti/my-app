export const normalizePath = (path: string) =>
  path.replace(/\/+$/, '') || '/'

export const isActivePath = (
  pathname: string,
  url: string,
  options?: { exact?: boolean; ignoreParams?: boolean }
): boolean => {
  const { exact = true, ignoreParams = false } = options || {}
  const normalizedPathname = normalizePath(pathname)
  const normalizedUrl = normalizePath(url)

  if (ignoreParams) {
    const regexString = normalizedUrl.replace(/:[^/]+/g, '[^/]+').replace(/\//g, '\\/')
    const regex = new RegExp(`^${regexString}$`)
    if (regex.test(normalizedPathname)) return true
    if (!exact && normalizedPathname.startsWith(normalizedUrl + '/')) return true
    return false
  }

  if (exact) return normalizedPathname === normalizedUrl
  return normalizedPathname === normalizedUrl || normalizedPathname.startsWith(normalizedUrl + '/')
}
