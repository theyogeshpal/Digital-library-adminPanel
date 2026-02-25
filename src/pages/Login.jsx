import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User, Shield } from 'lucide-react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    Swal.fire({
      title: 'Verifying Credentials...',
      text: 'Please wait while we authenticate',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', {
        username,
        password
      });

      localStorage.setItem('adminUsername', response.data.admin.username);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome to Admin Panel',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid credentials',
        confirmButtonColor: '#1e293b'
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md border border-slate-200">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-slate-900 rounded-xl mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
          <p className="text-slate-600 mt-2">Digital Library Management System</p>
        </div>
        
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Sign In to Continue</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
              <User className="w-4 h-4" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
              <Lock className="w-4 h-4" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-center text-slate-500 text-sm mt-6">
          © 2024 Digital Library. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login
