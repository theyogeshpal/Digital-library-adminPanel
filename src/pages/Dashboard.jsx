import { Users as UsersIcon, TrendingUp, Activity, DollarSign } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: UsersIcon, gradient: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50', change: '+12%' },
    { title: 'Total Books', value: '567', icon: Activity, gradient: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50', change: '+8%' },
    { title: 'Active Loans', value: '89', icon: TrendingUp, gradient: 'from-orange-500 to-red-500', bg: 'from-orange-50 to-red-50', change: '+23%' },
    { title: 'Revenue', value: '₹45,678', icon: DollarSign, gradient: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50', change: '+15%' },
  ]

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-slate-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.bg} p-6 rounded-2xl shadow-xl border border-white/50 hover:scale-105 transition-all duration-300 cursor-pointer group`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-slate-600 text-sm font-semibold uppercase tracking-wide">{stat.title}</h3>
                <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mt-2`}>{stat.value}</p>
              </div>
              <div className={`p-4 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-600">{stat.change}</span>
              <span className="text-sm text-slate-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
