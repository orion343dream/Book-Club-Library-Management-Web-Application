import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import type { Book, BookFormData } from "../types/Book"
import type { Category } from "../types/Category"

import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService"
import { getCategories } from "../services/categoryService"
import Loading from "../components/PageLoading"

const BookManagement: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategoryId, setFilterCategoryId] = useState("All")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean
    id: string | null
  }>({ show: false, id: null })

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    isbn: "",
    category: "",
    totalCopies: 1,
    availableCopies: 1,
  })

  const fetchBooksAndCategories = async () => {
    try {
      setLoading(true)
      const categoriesData = await getCategories()
      setCategories(categoriesData)

      if (categoriesData.length > 0) {
        setFormData((prev) => ({
          ...prev,
          category: categoriesData[0]._id,
        }))
        setFilterCategoryId("All")
      }

      const booksData = await getBooks()
      setBooks(booksData)
    } catch (error) {
      toast.error("Failed to load books or categories")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooksAndCategories()
  }, [])

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setErrors((prev) => ({ ...prev, [name]: "" })) // clear error
    if (name === "totalCopies") {
      const total = Number(value)
      setFormData((prev) => ({
        ...prev,
        totalCopies: total,
        availableCopies: editingId === null ? total : prev.availableCopies,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      isbn: "",
      category: categories.length > 0 ? categories[0]._id : "",
      totalCopies: 1,
      availableCopies: 1,
    })
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.title.trim()) newErrors.title = "Title is required."
    if (!formData.author.trim()) newErrors.author = "Author is required."
    if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required."
    if (!formData.category) newErrors.category = "Category is required."
    if (formData.totalCopies < 1) newErrors.totalCopies = "Must be at least 1 copy."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddBook = async () => {
    if (!validateForm()) return
    try {
      const toCreate = {
        ...formData,
        availableCopies: formData.totalCopies,
      }
      const newBook = await createBook(toCreate)
      setBooks((prev) => [...prev, newBook])
      toast.success("Book added")
      resetForm()
      setIsAdding(false)
    } catch (error) {
      toast.error("Failed to add book")
      console.error(error)
    }
  }

  const startEditing = (book: Book) => {
    setEditingId(book._id)
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category._id,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies,
    })
    setIsAdding(false)
    setErrors({})
  }

  const cancelEditing = () => {
    setEditingId(null)
    resetForm()
  }

  const saveEditing = async (id: string) => {
    if (!validateForm()) return
    try {
      const updatedBook = await updateBook(id, formData)
      setBooks((prev) => prev.map((b) => (b._id === id ? updatedBook : b)))
      toast.success("Book updated")
      setEditingId(null)
      fetchBooksAndCategories()
      resetForm()
    } catch (error) {
      toast.error("Failed to update book")
      console.error(error)
    }
  }

  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase()
    const matchesSearch =
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search) ||
        book.isbn.toLowerCase().includes(search)

    const matchesCategory =
        filterCategoryId === "All" || book.category._id === filterCategoryId

    return matchesSearch && matchesCategory
  })

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c._id === categoryId)
    return category ? category.name : ""
  }

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-indigo-800 via-blue-900 to-purple-900">
          <Loading />
        </div>
    )
  }

  const inputBase =
      "w-full rounded-lg px-4 py-2 text-white placeholder-white/70 border border-transparent bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition shadow-sm"

  const btnBase =
      "inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600"

  const btnIndigo = `${btnBase} bg-indigo-600 text-white hover:bg-indigo-700 shadow-md`
  const btnGreen = `${btnBase} bg-green-600 text-white hover:bg-green-700 shadow-md`
  const btnGray = `${btnBase} bg-slate-600 text-white hover:bg-slate-500 shadow`
  const btnRed = `${btnBase} bg-red-600 text-white hover:bg-red-700 shadow-md`

  return (
      <div className="relative max-w-7xl mx-auto p-8 rounded-xl bg-gradient-to-tr from-indigo-800 via-blue-900 to-purple-900 text-white shadow-lg">
        {/* Header */}
        <header className="mb-8 border-b border-white/20 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Decorative icon block */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transform transition-transform hover:scale-105 relative">
              <span className="block w-5 h-5 bg-white rounded-sm rotate-[-10deg]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Book Management</h1>
              <p className="text-sm text-white/80">Manage your library's book collection</p>
            </div>
          </div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto max-w-md">
            <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className={inputBase}
            />
            <select
                value={filterCategoryId}
                onChange={e => setFilterCategoryId(e.target.value)}
                className={inputBase.replace("text-white", "text-gray-200")}
            >
              <option value="All" className="text-indigo-900">All Categories</option>
              {categories.map(cat => (
                  <option key={cat._id} value={cat._id} className="text-indigo-900">
                    {cat.name}
                  </option>
              ))}
            </select>
          </div>
        </header>

        {/* Add form trigger */}
        {!isAdding && editingId === null && (
            <div className="flex justify-end mb-6">
              <button onClick={() => { resetForm(); setIsAdding(true) }} className={btnIndigo}>
                + Add New Book
              </button>
            </div>
        )}

        {/* Add/Edit Form */}
        {(isAdding || editingId !== null) && (
            <section className="my-8 p-6 rounded-xl border border-white/20 bg-white/10 shadow-inner max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold mb-6 text-indigo-300">
                {editingId ? "Edit Book" : "Add New Book"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["title", "author", "isbn", "totalCopies"].map(field => (
                    <div key={field}>
                      <input
                          name={field}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          type={field === "totalCopies" ? "number" : "text"}
                          value={formData[field as keyof BookFormData]}
                          onChange={handleChange}
                          min={field === "totalCopies" ? 1 : undefined}
                          className={inputBase}
                          autoComplete="off"
                      />
                      {errors[field] && (
                          <p className="text-red-400 text-sm mt-1">{errors[field]}</p>
                      )}
                    </div>
                ))}
                <div>
                  <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={inputBase}
                  >
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                    ))}
                  </select>
                  {errors.category && (
                      <p className="text-red-400 text-sm mt-1">{errors.category}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                {editingId ? (
                    <>
                      <button onClick={() => saveEditing(editingId)} className={btnGreen}>
                        Save Changes
                      </button>
                      <button onClick={cancelEditing} className={btnGray}>
                        Cancel
                      </button>
                    </>
                ) : (
                    <>
                      <button onClick={handleAddBook} className={btnGreen}>
                        Add Book
                      </button>
                      <button onClick={() => { resetForm(); setIsAdding(false) }} className={btnGray}>
                        Cancel
                      </button>
                    </>
                )}
              </div>
            </section>
        )}

        {/* Books Table */}
        <div className="overflow-x-auto rounded-lg border border-white/20 bg-white/10 shadow-lg">
          {filteredBooks.length === 0 ? (
              <p className="p-10 text-center text-white/70">No books found.</p>
          ) : (
              <table className="w-full table-auto border-collapse text-white">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold">
                <tr>
                  <th className="px-5 py-3 text-left">Title</th>
                  <th className="px-5 py-3 text-left">Author</th>
                  <th className="px-5 py-3 text-left">Category</th>
                  <th className="px-5 py-3 text-left">ISBN</th>
                  <th className="px-5 py-3 text-left">Total Copies</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map(book => (
                    <tr
                        key={book._id}
                        className="even:bg-white/10 hover:bg-purple-800/30 transition"
                    >
                      <td className="px-5 py-3">{book.title}</td>
                      <td className="px-5 py-3">{book.author}</td>
                      <td className="px-5 py-3">{getCategoryName(book.category._id)}</td>
                      <td className="px-5 py-3">{book.isbn}</td>
                      <td className="px-5 py-3">{book.totalCopies}</td>
                      <td className="px-5 py-3 whitespace-nowrap space-x-3">
                        <button onClick={() => startEditing(book)} className={btnIndigo}>
                          Edit
                        </button>
                        <button
                            onClick={() => setDeleteModal({ show: true, id: book._id })}
                            className={btnRed}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-white max-w-sm rounded-lg p-6 text-center shadow-xl space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Confirm Deletion</h2>
                <p className="text-gray-600">Are you sure you want to delete this book?</p>
                <div className="flex justify-center gap-4">
                  <button
                      onClick={async () => {
                        try {
                          if (deleteModal.id) {
                            await deleteBook(deleteModal.id)
                            setBooks(prev => prev.filter(b => b._id !== deleteModal.id))
                            toast.success("Book deleted")
                          }
                        } catch {
                          toast.error("Failed to delete book")
                        } finally {
                          setDeleteModal({ show: false, id: null })
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md px-6 py-2"
                  >
                    Yes, Delete
                  </button>
                  <button
                      onClick={() => setDeleteModal({ show: false, id: null })}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md px-6 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  )
}

export default BookManagement
