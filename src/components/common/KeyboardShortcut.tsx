import { useShortcut } from '@/hooks/useShortcut'
import {
  useCommand,
  useTheme
} from '@/providers'
import { authService } from '@/services/authService'

export const KeyboardShortcut = () => {
  const { toggleTheme } = useTheme()
  const { openCommand } = useCommand()

  useShortcut(['meta+j', 'ctrl+j'], toggleTheme)
  useShortcut(['meta+k', 'ctrl+k'], openCommand)
  useShortcut(['meta+q', 'ctrl+q'], () => authService.signOut())

  return null
}
