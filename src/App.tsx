import { RouterProvider } from 'react-router-dom'

import { AuthProvider, ThemeProvider } from '@/contexts'
import { router } from '@/routers'

export const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>
)
