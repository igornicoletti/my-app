import { createBrowserRouter, redirect, type RouteObject } from 'react-router-dom'

import { ROUTE } from '@/configs'
import { getProtectedRoutes } from '@/routers/protected.routes'
import { getPublicRoutes } from '@/routers/public.routes'
import { authService } from '@/services'


const allRoutes: RouteObject[] = [
  ...getPublicRoutes(),
  ...getProtectedRoutes()
]

export const router = createBrowserRouter([{
  element: <ROUTE.RootLayout />,
  errorElement: <ROUTE.ErrorFallback />,
  children: [
    {
      // Rota raiz com um loader
      path: '/',
      loader: () => {
        const currentUser = authService.getCurrentUser() // Verifica o usuário diretamente
        if (currentUser && currentUser.emailVerified) {
          return redirect('/dashboard')
        }
        return redirect('/login')
      },
      // Não precisa de 'element' aqui, pois o loader já faz o redirecionamento
    },
    ...allRoutes,
    {
      path: '*',
      element: <ROUTE.NotFound />
    }
  ]
}])