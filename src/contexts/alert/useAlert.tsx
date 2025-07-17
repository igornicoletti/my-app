import { useContext } from 'react'

import { AlertProviderContext } from '@/contexts'

export const useAlert = () => {
  const context = useContext(AlertProviderContext)

  if (!context)
    throw new Error('useAlert must be used within a AlertProvider')

  return context
}
