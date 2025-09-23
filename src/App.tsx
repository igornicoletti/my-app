import { ProviderAuth } from '@/providers/auth'
import { ProviderCommand } from '@/providers/command'
import { ProviderConfirm } from '@/providers/confirm'
import { ProviderTheme } from '@/providers/theme'
import { router } from '@/routes/router'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

export const App = () => (
  <HelmetProvider>
    <ProviderTheme>
      <ProviderAuth>
        <ProviderConfirm>
          <ProviderCommand>
            <RouterProvider router={router} />
          </ProviderCommand>
        </ProviderConfirm>
      </ProviderAuth>
    </ProviderTheme>
  </HelmetProvider>
)
