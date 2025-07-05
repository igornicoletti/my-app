import { MoonIcon, SunIcon } from '@phosphor-icons/react'

import { Button } from '@/components'
import { useTheme } from '@/contexts'

export const ThemeSwitcher = ({ ...props }) => {
  const { toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme} size='icon' {...props}>
      <MoonIcon className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <SunIcon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}