import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import UserDashboard from './components/UserDashboard'
import LandingPage from './components/LandingPage'
import ViewUser from './components/ViewUser'
import AdminPanel from './components/AdminPanel'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/admin/user/:username" element={
          <ProtectedRoute>
            <ViewUser />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}

export default App
