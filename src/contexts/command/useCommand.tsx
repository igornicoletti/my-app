import { useContext } from 'react'

import { CommandProviderContext } from '@/contexts'

export const useCommand = () => {
  const context = useContext(CommandProviderContext)

  if (context === null)
    throw new Error('useCommand must be used within a CommandProvider')

  return context
}
