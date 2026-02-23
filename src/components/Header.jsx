import { Bell, Search, User } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20 p-6 flex justify-between items-center sticky top-0 z-10">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back, Admin</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-slate-100 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 outline-none w-64"
          />
        </div>
        <button className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <Bell className="w-6 h-6 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-200/50">
          <span className="text-slate-700 font-medium">Admin</span>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
