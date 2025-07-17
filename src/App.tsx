import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import {
  AlertProvider,
  AuthProvider,
  CommandProvider,
  ThemeProvider
} from '@/contexts'
import { router } from '@/routers'

export const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <AuthProvider>
        <CommandProvider>
          <AlertProvider>
            <RouterProvider router={router} />
          </AlertProvider>
        </CommandProvider>
      </AuthProvider>
    </ThemeProvider>
  </HelmetProvider>
)
