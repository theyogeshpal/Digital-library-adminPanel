import { UserPlus, Edit2, Trash2, Mail, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://digital-library-backend-jesb.onrender.com/api/users')
        setUsers(response.data.data)
      } catch (error) {
        console.error('Error fetching users:', error)
        setUsers([])
      }
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 mt-1 text-sm">Manage all registered users</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:shadow-xl transition-all font-semibold text-sm">
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/50">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase">Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase">Username</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase">Email</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(users) || users.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading users...</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id || user.id} className="border-t border-slate-100 hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{user.fullname}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{user.username}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md w-fit">
                      <CheckCircle className="w-4 h-4" />
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 bg-green-500 text-white px-2 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
                        <Edit2 className="w-4 h-4" />
                        
                      </button>
                      <button className="flex items-center gap-1 bg-red-500 text-white px-2 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
                        <Trash2 className="w-4 h-4" />
                        
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {!Array.isArray(users) || users.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 text-center text-slate-500">Loading users...</div>
        ) : (
          users.map((user) => (
            <div key={user._id || user.id} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{user.fullname}</h3>
                  <p className="text-slate-600 text-sm">@{user.username}</p>
                </div>
                <span className="flex items-center gap-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  {user.status || 'Active'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-lg font-medium text-sm">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-lg font-medium text-sm">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Users
