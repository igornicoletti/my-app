import { useShortcut } from '@/hooks/use-shortcut'
import { useCommand } from '@/providers/command'
import { useTheme } from '@/providers/theme'
import { ServiceAuth } from '@/services/auth'

export const CommonShortcut = () => {
  const { toggleTheme } = useTheme()
  const { openCommand } = useCommand()

  useShortcut(['meta+j', 'ctrl+j'], toggleTheme)
  useShortcut(['meta+k', 'ctrl+k'], openCommand)
  useShortcut(['shift+meta+q', 'shift+ctrl+q'], () => ServiceAuth.signOut())

  return null
}
