import { UserPlus, Edit2, Trash2, Mail, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users')
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 mt-1">Manage all registered users</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
          <UserPlus className="w-5 h-5" />
          Add User
        </button>
      </div>
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/50">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Username</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Actions</th>
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
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md w-fit">
                      <CheckCircle className="w-4 h-4" />
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all font-medium">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users
