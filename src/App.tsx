import { ProviderAuth } from '@/providers/auth'
import { ProviderCommand } from '@/providers/command'
import { ProviderTheme } from '@/providers/theme'
import { router } from '@/routes/router'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

export const App = () => (
  <HelmetProvider>
    <ProviderTheme>
      <ProviderAuth>
        <ProviderCommand>
          <RouterProvider router={router} />
        </ProviderCommand>
      </ProviderAuth>
    </ProviderTheme>
  </HelmetProvider>
)
