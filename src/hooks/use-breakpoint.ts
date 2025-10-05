import { useEffect, useState } from 'react'

export const useBreakpoint = (query: string) => {
  const [value, setValue] = useState(false)

  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches)
    }

    const result = window.matchMedia(query)
    setValue(result.matches)
    result.addEventListener('change', onChange)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}
