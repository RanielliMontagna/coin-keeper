import { Routes, Route, Navigate } from 'react-router-dom'

import { Login } from 'containers/login'
import { Register } from 'containers/register/register'
import { Dashboard } from 'containers/dashboard'
import { Erro404 } from 'containers/erro404'
import { Terms } from 'containers/terms'
import { Privacy } from 'containers/privacy'

import { PrivateLayout } from 'layouts/privateLayout'
import { PublicLayout } from 'layouts/publicLayout'
import { useAuthStore } from 'store/auth/auth'

export function Router() {
  const { token } = useAuthStore()

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<PrivateLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/404" element={<Erro404 />} />

        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  )
}
