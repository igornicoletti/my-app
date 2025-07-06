import { MoonIcon, SunIcon } from '@phosphor-icons/react'

import { Button } from '@/components'
import { useTheme } from '@/contexts'

export const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme} size='icon' variant='ghost'>
      {!isDark ? <MoonIcon /> : <SunIcon />}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}