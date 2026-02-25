import { BookPlus, Edit2, Trash2, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Books = () => {

  const navigate = useNavigate()
  
  const admin = localStorage.removeItem('adminUsername')
  
  useEffect(() => {
    console.log(admin)
    if(!admin){
      navigate('/')
    }
  }, [navigate])

  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction' },
    { id: 3, title: '1984', author: 'George Orwell', category: 'Dystopian' },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Book Management</h2>
          <p className="text-slate-500 mt-1 text-sm">Manage your library collection</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:shadow-xl transition-all font-semibold text-sm">
          <BookPlus className="w-4 h-4" />
          Add Book
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/50">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase">ID</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase">Title</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase">Author</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase">Category</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t border-slate-100 hover:bg-purple-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-700">{book.id}</td>
                <td className="px-6 py-4 font-medium text-slate-800">{book.title}</td>
                <td className="px-6 py-4 text-slate-600">{book.author}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-2 border border-gray-500 text-gray-500 px-4 py-1 rounded-full text-sm font-semibold shadow-md w-fit hover:text-white hover:bg-gray-500">
                    <Tag className="w-4 h-4" />
                    {book.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 bg-green-600 text-white px-2 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
                      <Edit2 className="w-4 h-4" />
                      
                    </button>
                    <button className="flex items-center gap-1 bg-red-500 text-white px-2 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
                      <Trash2 className="w-4 h-4" />
                      
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{book.title}</h3>
                <p className="text-slate-600 text-sm">{book.author}</p>
              </div>
              <span className="text-slate-500 text-sm font-semibold">#{book.id}</span>
            </div>
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                <Tag className="w-3 h-3" />
                {book.category}
              </span>
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
        ))}
      </div>
    </div>
  )
}

export default Books
