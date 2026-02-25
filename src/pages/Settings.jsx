import { Save, Building2, Mail, Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Settings = () => {

  const navigate = useNavigate()
  
  const admin = localStorage.removeItem('adminUsername')
  useEffect(() => {
    console.log(admin)
    if(!admin){
      navigate('/')
    }
  }, [navigate])


  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500 mt-1">Manage your application settings</p>
      </div>
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-8 max-w-2xl border border-white/50">
        <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">General Settings</h3>
        <form>
          <div className="mb-6">
            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
              <Building2 className="w-5 h-5" />
              Site Name
            </label>
            <input
              type="text"
              defaultValue="Digital Library"
              className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50"
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
              <Mail className="w-5 h-5" />
              Contact Email
            </label>
            <input
              type="email"
              defaultValue="admin@digitallibrary.com"
              className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50"
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
              <Phone className="w-5 h-5" />
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="+91 1234567890"
              className="w-full px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings
