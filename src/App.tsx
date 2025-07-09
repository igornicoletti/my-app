import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import {
  AuthProvider,
  ThemeProvider
} from '@/contexts'
import { router } from '@/routers'

export const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </HelmetProvider>
)
