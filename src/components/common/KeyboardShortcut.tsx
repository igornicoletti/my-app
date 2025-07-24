import { useCommand, useTheme } from '@/contexts'
import { useShortcut } from '@/hooks'
import { authService } from '@/services'

export const KeyboardShortcut = () => {
  const { toggleTheme } = useTheme()
  const { openCommand } = useCommand()

  useShortcut(['meta+j', 'ctrl+j'], toggleTheme)
  useShortcut(['meta+k', 'ctrl+k'], openCommand)
  useShortcut(['meta+q', 'ctrl+q'], () => authService.signOut())

  return null
}
