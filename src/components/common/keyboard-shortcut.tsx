import { useShortcut } from '@/hooks/use-shortcut'
import { useCommand } from '@/providers/command-provider'
import { useTheme } from '@/providers/theme-provider'
import { authService } from '@/services/auth-service'

export const KeyboardShortcut = () => {
  const { toggleTheme } = useTheme()
  const { openCommand } = useCommand()

  useShortcut(['meta+j', 'ctrl+j'], toggleTheme)
  useShortcut(['meta+k', 'ctrl+k'], openCommand)
  useShortcut(['shift+meta+q', 'shift+ctrl+q'], () => authService.signOut())

  return null
}
