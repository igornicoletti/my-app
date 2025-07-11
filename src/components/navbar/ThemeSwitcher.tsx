import { MoonIcon, SunIcon } from '@phosphor-icons/react'

import { Button } from '@/components'
import { useTheme } from '@/contexts'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme} size='icon' variant='ghost'>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
