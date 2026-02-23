import { BookPlus, Edit2, Trash2, Tag } from 'lucide-react'

const Books = () => {
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction' },
    { id: 3, title: '1984', author: 'George Orwell', category: 'Dystopian' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Book Management</h2>
          <p className="text-slate-500 mt-1">Manage your library collection</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
          <BookPlus className="w-5 h-5" />
          Add Book
        </button>
      </div>
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-white/50">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Author</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-t border-slate-100 hover:bg-purple-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-700">{book.id}</td>
                <td className="px-6 py-4 font-medium text-slate-800">{book.title}</td>
                <td className="px-6 py-4 text-slate-600">{book.author}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md w-fit">
                    <Tag className="w-4 h-4" />
                    {book.category}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Books
