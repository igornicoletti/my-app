import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import {
  AuthProvider,
  CommandProvider,
  ConfirmProvider,
  ThemeProvider
} from '@/providers'
import { router } from '@/routes'

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
