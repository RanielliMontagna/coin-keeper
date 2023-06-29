import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { PrivateLayout } from 'layouts/privateLayout'
import { PublicLayout } from 'layouts/publicLayout'

import { useAuthStore } from 'store/auth/auth'
import { Loading } from 'components/loading'

export function Router() {
  const Login = lazy(() => import('containers/login'))
  const Register = lazy(() => import('containers/register'))
  const Dashboard = lazy(() => import('containers/dashboard'))
  const Accounts = lazy(() => import('containers/accounts'))
  const Transactions = lazy(() => import('containers/transactions'))
  const Categories = lazy(() => import('containers/categories'))
  const Terms = lazy(() => import('containers/terms'))
  const Privacy = lazy(() => import('containers/privacy'))
  const Erro404 = lazy(() => import('containers/erro404'))
  const Erro500 = lazy(() => import('containers/erro500'))

  const { token } = useAuthStore()

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {!token ? (
          <>
            <Route path="/" element={<PublicLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

              <Route path="/500" element={<Erro500 />} />

              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Route>
          </>
        ) : (
          <Route path="/" element={<PrivateLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />

            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            <Route path="/404" element={<Erro404 />} />
            <Route path="/500" element={<Erro500 />} />

            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  )
}
