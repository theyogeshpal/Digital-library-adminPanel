import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import Books from '../pages/Books'
import Settings from '../pages/Settings'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = useNavigate()

  const admin = localStorage.removeItem('adminUsername')
  if(!admin){
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/books" element={<Books />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Layout
