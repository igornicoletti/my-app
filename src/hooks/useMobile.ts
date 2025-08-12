import { useEffect, useState } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${768 - 1}px)`)

    const onChange = () => {
      setIsMobile(window.innerWidth < 768)
    }

    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < 768)

    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
