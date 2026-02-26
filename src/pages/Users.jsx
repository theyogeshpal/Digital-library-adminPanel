import { UserPlus, Edit2, Trash2, Mail, CheckCircle, X } from 'lucide-react'
import { useState, useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Users = () => {

  const navigate = useNavigate();

  const admin = localStorage.getItem('adminUsername')
  useEffect(() => {
    if(!admin){
      navigate('/')
    }
  }, [navigate, admin])

  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: ''
  })
  const [editFormData, setEditFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    bio: ''
  })

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

  const handleDelete = async (userId, userName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${userName}? This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleting User...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        await axios.delete(`http://localhost:3000/api/user/delete/${userId}`);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'User has been deleted successfully.',
          timer: 1500,
          showConfirmButton: false
        });

        setUsers(users.filter(user => (user._id || user.id) !== userId));
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: error.response?.data?.message || 'Failed to delete user',
          confirmButtonColor: '#4F46E5'
        });
      }
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Password and Confirm Password do not match',
        confirmButtonColor: '#4F46E5'
      });
      return;
    }

    Swal.fire({
      title: 'Creating User...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const { confirmPassword, ...userData } = formData;
      await axios.post('https://digital-library-backend-jesb.onrender.com/api/user', userData);

      Swal.fire({
        icon: 'success',
        title: 'User Created!',
        text: 'User has been registered successfully',
        timer: 1500,
        showConfirmButton: false
      });

      setShowModal(false);
      setFormData({
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: ''
      });

      const response = await axios.get('https://digital-library-backend-jesb.onrender.com/api/users');
      setUsers(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Failed to create user',
        confirmButtonColor: '#4F46E5'
      });
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setEditFormData({
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      bio: user.bio 
    });
    setShowEditModal(true);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Updating User...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await axios.put('http://localhost:3000/api/user/update', editFormData);

      Swal.fire({
        icon: 'success',
        title: 'User Updated!',
        text: 'User profile has been updated successfully',
        timer: 1500,
        showConfirmButton: false
      });

      setShowEditModal(false);
      const response = await axios.get('https://digital-library-backend-jesb.onrender.com/api/users');
      setUsers(response.data.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update user',
        confirmButtonColor: '#4F46E5'
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 mt-1 text-sm">Manage all registered users</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl hover:shadow-xl transition-all font-semibold text-sm"
        >
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
                      <button 
                        onClick={() => handleEditClick(user)}
                        className="flex items-center gap-1 bg-green-500 text-white px-2 py-2 rounded-lg hover:shadow-lg transition-all font-medium"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user._id || user.id, user.fullname)}
                        className="flex items-center gap-1 bg-red-500 text-white px-2 py-2 rounded-lg hover:shadow-lg transition-all font-medium"
                      >
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
                <button 
                  onClick={() => handleEditClick(user)}
                  className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-lg font-medium text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(user._id || user.id, user.fullname)}
                  className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-lg font-medium text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-blue-500 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-blue-600">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-4">Add New User</h2>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-blue-500 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-blue-600">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-4">Edit User</h2>

            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editFormData.fullname}
                  onChange={(e) => setEditFormData({...editFormData, fullname: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={editFormData.username}
                  readOnly
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                <textarea
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({...editFormData, bio: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="3"
                  placeholder="Enter bio"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
