import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, BookOpen, Settings, LogOut, Sparkles, X } from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/books', icon: BookOpen, label: 'Books' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Close button for mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Admin Panel</h2>
          </div>
        </div>
        <nav className="mt-8 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 mb-2 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-blue-600 shadow-sm shadow-blue-500/50'
                    : 'hover:bg-slate-700/50 hover:translate-x-1'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                  <span className="font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-6 w-full px-6">
          <button className="flex items-center gap-4 w-full px-4 py-3.5 hover:bg-red-600/20 rounded-xl transition-all duration-300 hover:translate-x-1 border border-slate-700/50 group">
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
