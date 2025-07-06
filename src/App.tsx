import { RouterProvider } from 'react-router-dom'

import { AuthProvider, ThemeProvider } from '@/contexts'
import { router } from '@/routers'
import { HelmetProvider } from 'react-helmet-async'

export const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </HelmetProvider>
)
