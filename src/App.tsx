import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from '@/providers/auth-provider'
import { CommandProvider } from '@/providers/command-provider'
import { ConfirmProvider } from '@/providers/confirm-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { router } from '@/routes/router'

export const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <AuthProvider>
        <ConfirmProvider>
          <CommandProvider>
            <RouterProvider router={router} />
          </CommandProvider>
        </ConfirmProvider>
      </AuthProvider>
    </ThemeProvider>
  </HelmetProvider>
)
