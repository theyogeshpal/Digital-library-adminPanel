import { BookPlus, Edit2, Trash2, Tag, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const Books = () => {

  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    rating: '',
    reviews: '',
    pages: '',
    language: '',
    publishDate: '',
    isbn: '',
    image: null,
    bookPdf: null,
    description: '',
    fullDescription: ''
  })
  
  const admin = localStorage.getItem('adminUsername');
  
  
  const [books, setBooks] = useState([])

  useEffect(() => {
    if(!admin){
      navigate('/')
    }

    const getbookdata = async () => {
      try {
        const data = await axios.get('https://digital-library-backend-jesb.onrender.com/book/show')
        setBooks(data.data.data)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    getbookdata()
  }, [navigate, admin])

  const handleAddBook = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Adding Book...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const bookFormData = new FormData();
      Object.keys(formData).forEach(key => {
        bookFormData.append(key, formData[key]);
      });

      await axios.post('https://digital-library-backend-jesb.onrender.com/book/add', bookFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      Swal.fire({
        icon: 'success',
        title: 'Book Added!',
        text: 'Book has been added successfully',
        timer: 1500,
        showConfirmButton: false
      });

      setShowModal(false);
      setFormData({
        title: '',
        author: '',
        category: '',
        rating: '',
        pages: '',
        language: '',
        publishDate: '',
        isbn: '',
        image: null,
        bookPdf: null,
        description: '',
        fullDescription: ''
      });

      const data = await axios.get('https://digital-library-backend-jesb.onrender.com/book/show')
      setBooks(data.data.data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Book',
        text: error.response?.data?.message || 'Something went wrong',
        confirmButtonColor: '#4F46E5'
      });
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      rating: book.rating,
      pages: book.pages,
      language: book.language,
      publishDate: book.publishDate,
      isbn: book.isbn,
      description: book.description,
      fullDescription: book.fullDescription
    })
    setShowEditModal(true)
  }

  const handleUpdateBook = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Updating Book...',
      text: 'Please wait',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await axios.put(`https://digital-library-backend-jesb.onrender.com/book/update/${editingBook._id}`, formData);

      Swal.fire({
        icon: 'success',
        title: 'Book Updated!',
        text: 'Book has been updated successfully',
        timer: 1500,
        showConfirmButton: false
      });

      setShowEditModal(false);
      setEditingBook(null);
      
      const data = await axios.get('https://digital-library-backend-jesb.onrender.com/book/show')
      setBooks(data.data.data)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update Book',
        text: error.response?.data?.message || 'Something went wrong',
        confirmButtonColor: '#4F46E5'
      });
    }
  };

  const deleteBook = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4F46E5',
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/book/delete/${id}`)
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Book has been deleted.',
            timer: 1500,
            showConfirmButton: false
          });
          const data = await axios.get('https://digital-library-backend-jesb.onrender.com/book/show')
          setBooks(data.data.data)
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Failed to Delete Book',
            text: error.response?.data?.message || 'Something went wrong',
            confirmButtonColor: '#4F46E5'
          });
        }
      }
    });
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Book Management</h2>
          <p className="text-slate-500 mt-1 text-sm">Manage your library collection</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:shadow-xl transition-all font-semibold text-sm"
        >
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
              <tr key={book._id} className="border-t border-slate-100 hover:bg-purple-50/50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-700">#{book._id}</td>
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
                    <button 
                      onClick={() => handleEditBook(book)}
                      className="flex items-center gap-1 bg-green-600 text-white px-2 py-2 rounded-lg hover:shadow-lg transition-all font-medium"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => {
                      deleteBook(book._id)
                    }} className="flex items-center gap-1 bg-red-500 text-white px-2 py-2 rounded-lg hover:shadow-lg transition-all font-medium">
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
          <div key={book._id} className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{book.title}</h3>
                <p className="text-slate-600 text-sm">{book.author}</p>
              </div>
              <span className="text-slate-500 text-sm font-semibold">#{book._id}</span>
            </div>
            <div className="mb-4">``
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                <Tag className="w-3 h-3" />
                {book.category}
              </span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleEditBook(book)}
                className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-lg font-medium text-sm"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={() => deleteBook(book._id)}
                className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-lg font-medium text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Book Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-blue-500 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-blue-600">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-6">Add New Book</h2>

            <form onSubmit={handleAddBook} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                  <input
                    type="text"
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pages</label>
                  <input
                    type="number"
                    value={formData.pages}
                    onChange={(e) => setFormData({...formData, pages: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Date</label>
                  <input
                    type="text"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ISBN</label>
                  <input
                    type="text"
                    value={formData.isbn}
                    onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Book Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Book PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFormData({...formData, bookPdf: e.target.files[0]})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="4"
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
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-green-500 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-green-600">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-6">Edit Book</h2>

            <form onSubmit={handleUpdateBook} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                  <input
                    type="text"
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pages</label>
                  <input
                    type="number"
                    value={formData.pages}
                    onChange={(e) => setFormData({...formData, pages: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Date</label>
                  <input
                    type="text"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ISBN</label>
                  <input
                    type="text"
                    value={formData.isbn}
                    onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows="4"
                  required
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
                  Update Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Books
