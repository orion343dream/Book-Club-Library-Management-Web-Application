import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import type { Reader, ReaderFormData } from "../types/Reader"
import {
  createReader,
  deleteReader,
  getReaders,
  updateReader,
} from "../services/readerService"
import Loading from "../components/PageLoading"

const ReaderManagement: React.FC = () => {
  const [readers, setReaders] = useState<Reader[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<ReaderFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isAdding, setIsAdding] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDomain, setFilterDomain] = useState("All")
  const [loading, setLoading] = useState<boolean>(true)

  // Load readers
  const loadReaders = async () => {
    try {
      setLoading(true)
      const data = await getReaders()
      setReaders(data)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load readers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReaders()
  }, [])

  // Controlled inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Email domains (guard invalid emails)
  const emailDomains = Array.from(
      new Set(
          readers
              .map(r => {
                const parts = (r.email || "").split("@")
                return parts.length === 2 ? parts[1] : null
              })
              .filter((d): d is string => Boolean(d))
      )
  )

  // Filtered list
  const filteredReaders = readers.filter(reader => {
    const name = reader.name?.toLowerCase() ?? ""
    const email = reader.email?.toLowerCase() ?? ""
    const phone = reader.phone?.toString() ?? ""
    const term = searchTerm.toLowerCase()

    const matchesSearch =
        name.includes(term) || email.includes(term) || phone.includes(searchTerm)
    const matchesDomain =
        filterDomain === "All" ||
        (reader.email && reader.email.endsWith("@" + filterDomain))

    return matchesSearch && matchesDomain
  })

  // Add
  const handleAddReader = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Name, Email, and Phone are required")
      return
    }
    try {
      const newReader = await createReader({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address?.trim() || undefined,
      })
      setReaders(prev => [...prev, newReader])
      toast.success("Reader added")
      resetForm()
      setIsAdding(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to add reader")
    }
  }

  // Start edit
  const startEditing = (reader: Reader) => {
    setEditingId(reader._id)
    setFormData({
      name: reader.name ?? "",
      email: reader.email ?? "",
      phone: reader.phone ?? "",
      address: reader.address ?? "",
    })
  }

  // Cancel
  const cancelEditing = () => {
    setEditingId(null)
    resetForm()
  }

  // Save edit
  const saveEditing = async (id: string) => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Name, Email, and Phone are required")
      return
    }
    try {
      const updated = await updateReader(id, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address?.trim() || undefined,
      })
      setReaders(prev => prev.map(r => (r._id === id ? updated : r)))
      toast.success("Reader updated")
      setEditingId(null)
      resetForm()
    } catch (err) {
      console.error(err)
      toast.error("Failed to update reader")
    }
  }

  // Delete
  const handleDeleteReader = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this reader?")) return
    try {
      await deleteReader(id)
      setReaders(prev => prev.filter(r => r._id !== id))
      toast.success("Reader deleted")
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete reader")
    }
  }

  const resetForm = () =>
      setFormData({ name: "", email: "", phone: "", address: "" })


  // Style classes - updated styles only
  const inputBase =
      "w-full rounded-lg px-4 py-2 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition shadow-sm"

  const btnBase =
      "inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600"

  const btnIndigo = `${btnBase} bg-indigo-600 text-white hover:bg-indigo-700 shadow-md`
  const btnGreen = `${btnBase} bg-green-600 text-white hover:bg-green-700 shadow-md`
  const btnGray = `${btnBase} bg-gray-300 text-gray-800 hover:bg-gray-400 shadow`
  const btnRed = `${btnBase} bg-red-600 text-white hover:bg-red-700 shadow-md`



  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-indigo-800 via-blue-900 to-purple-900">
          <Loading />
        </div>
    )
  }

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
              <h1 className="text-xl font-bold">Reader Management</h1>
              <p className="text-sm text-white/80">Manage library readers</p>
            </div>
          </div>

          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center w-full sm:w-auto max-w-md">
            <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className={inputBase.replace("text-gray-900", "text-white placeholder-white/70")}
            />
            <select
                value={filterDomain}
                onChange={e => setFilterDomain(e.target.value)}
                className={inputBase.replace("text-gray-900", "text-white placeholder-white/70")}
            >
              <option value="All" className="text-indigo-900">All Email Domains</option>
              {emailDomains.map(domain => (
                  <option key={domain} value={domain} className="text-indigo-900">{domain}</option>
              ))}
            </select>
          </div>
        </header>

        {/* Add form trigger */}
        {!isAdding && editingId === null && (
            <div className="flex justify-end mb-6">
              <button onClick={() => setIsAdding(true)} className={btnIndigo}>
                + Add New Reader
              </button>
            </div>
        )}

        {/* Add form */}
        {(isAdding || editingId !== null) && (
            <section className="my-8 p-6 rounded-xl border border-white/20 bg-white/10 shadow-inner max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold mb-6 text-indigo-300">
                {editingId ? "Edit Reader" : "Add New Reader"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputBase.replace("text-gray-900", "text-white placeholder-white/70")}
                    autoComplete="off"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputBase.replace("text-gray-900", "text-white placeholder-white/70")}
                    autoComplete="off"
                />
                <input
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputBase.replace("text-gray-900", "text-white placeholder-white/70")}
                    autoComplete="off"
                />
                <input
                    name="address"
                    placeholder="Address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className={inputBase.replace("text-gray-900", "text-white placeholder-white/70")}
                    autoComplete="off"
                />
              </div>

              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                {editingId ? (
                    <>
                      <button onClick={() => saveEditing(editingId)} className={btnGreen}>
                        Save Changes
                      </button>
                      <button
                          onClick={() => {
                            cancelEditing()
                            resetForm()
                          }}
                          className={btnGray}
                      >
                        Cancel
                      </button>
                    </>
                ) : (
                    <>
                      <button onClick={handleAddReader} className={btnGreen}>
                        Add Reader
                      </button>
                      <button
                          onClick={() => {
                            setIsAdding(false)
                            resetForm()
                          }}
                          className={btnGray}
                      >
                        Cancel
                      </button>
                    </>
                )}
              </div>
            </section>
        )}

        {/* Readers table */}
        <div className="overflow-x-auto rounded-lg border border-white/20 bg-white/10 shadow-lg">
          {filteredReaders.length === 0 ? (
              <p className="p-10 text-center text-white/70">No readers found.</p>
          ) : (
              <table className="w-full table-auto border-collapse text-white">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold">
                <tr>
                  <th className="px-5 py-3 text-left">Name</th>
                  <th className="px-5 py-3 text-left">Email</th>
                  <th className="px-5 py-3 text-left">Phone</th>
                  <th className="px-5 py-3 text-left">Address</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredReaders.map(reader =>
                    editingId === reader._id ? (
                        <tr key={reader._id} className="bg-yellow-300/20 text-black">
                          <td className="p-4">
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="p-4">
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="p-4">
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="p-4">
                            <input
                                name="address"
                                value={formData.address || ""}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="p-4 whitespace-nowrap space-x-3">
                            <button onClick={() => saveEditing(reader._id)} className={btnGreen}>
                              Save
                            </button>
                            <button onClick={cancelEditing} className={btnGray}>
                              Cancel
                            </button>
                          </td>
                        </tr>
                    ) : (
                        <tr
                            key={reader._id}
                            className="even:bg-white/10 hover:bg-purple-800/30 transition"
                        >
                          <td className="px-5 py-3">{reader.name}</td>
                          <td className="px-5 py-3 break-words">{reader.email}</td>
                          <td className="px-5 py-3">{reader.phone}</td>
                          <td className="px-5 py-3">{reader.address || "—"}</td>
                          <td className="px-5 py-3 whitespace-nowrap space-x-3">
                            <button onClick={() => startEditing(reader)} className={btnIndigo}>
                              Edit
                            </button>
                            <button onClick={() => handleDeleteReader(reader._id)} className={btnRed}>
                              Delete
                            </button>
                          </td>
                        </tr>
                    )
                )}
                </tbody>
              </table>
          )}
        </div>
      </div>
  )
}

export default ReaderManagement
