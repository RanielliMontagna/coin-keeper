import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { PrivateLayout } from 'layouts/privateLayout'
import { PublicLayout } from 'layouts/publicLayout'

import { useAuthStore } from 'store/auth/auth'
import { Loading } from 'components/loading'

import Login from 'containers/login'
import Register from 'containers/register'
import Terms from 'containers/terms'
import Privacy from 'containers/privacy'
import Dashboard from 'containers/dashboard'
import Accounts from 'containers/accounts'
import Transactions from 'containers/transactions'
import Categories from 'containers/categories'
import CreditCards from 'containers/creditCards'
import Erro500 from 'containers/erro500'
import Erro404 from 'containers/erro404'

export function Router() {
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
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/credit-cards" element={<CreditCards />} />

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
