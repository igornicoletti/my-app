import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import {
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
          <RouterProvider router={router} />
        </CommandProvider>
      </AuthProvider>
    </ThemeProvider>
  </HelmetProvider>
)
