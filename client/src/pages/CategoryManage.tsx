import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Category, CategoryFormData } from "../types/Category";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";
import Loading from "../components/PageLoading";

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startEditing = (category: Category) => {
    setEditingId(category._id);
    setFormData({ name: category.name, description: category.description || "" });
    setIsAdding(false);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({ name: "", description: "" });
  };

  const saveEditing = async () => {
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      const updated = await updateCategory(editingId!, formData);
      setCategories((prev) =>
          prev.map((cat) => (cat._id === editingId ? updated : cat))
      );
      toast.success("Category updated");
      cancelEditing();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category");
    }
  };

  const handleAddCategory = async () => {
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    try {
      const newCategory = await createCategory(formData);
      setCategories((prev) => [...prev, newCategory]);
      toast.success("Category added");
      setFormData({ name: "", description: "" });
      setIsAdding(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      toast.success("Category deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  const filteredCategories = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-indigo-800 via-blue-900 to-purple-900">
          <Loading />
        </div>
    );
  }

  const inputBase =
      "w-full rounded-lg px-4 py-2 border border-transparent placeholder-white/70 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition shadow-sm";

  const btnBase =
      "inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600";

  const btnIndigo = `${btnBase} bg-indigo-600 text-white hover:bg-indigo-700 shadow-md`;
  const btnGreen = `${btnBase} bg-green-600 text-white hover:bg-green-700 shadow-md`;
  const btnGray = `${btnBase} bg-slate-600 text-white hover:bg-slate-500 shadow`;
  const btnRed = `${btnBase} bg-red-600 text-white hover:bg-red-700 shadow-md`;

  return (
      <div className="max-w-7xl mx-auto bg-gradient-to-tr from-indigo-800 via-blue-900 to-purple-900 rounded-2xl p-8 text-white shadow-2xl">
        {/* Header */}
        <header className="mb-8 border-b border-white/20 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transform transition-transform hover:scale-105">
              <span className="block w-5 h-5 bg-white rounded-sm rotate-[-10deg]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Category Management</h1>
              <p className="text-sm text-white/80">Manage your library's categories</p>
            </div>
          </div>

          {/* Search */}
          <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${inputBase} max-w-md w-full`}
              aria-label="Search categories"
          />
        </header>

        {/* Add New Category button aligned right */}
        {!isAdding && editingId === null && (
            <div className="flex justify-end mb-6">
              <button
                  onClick={() => {
                    setFormData({ name: "", description: "" });
                    setIsAdding(true);
                  }}
                  className={btnIndigo}
              >
                + Add New Category
              </button>
            </div>
        )}

        {/* Add/Edit Form */}
        {(isAdding || editingId !== null) && (
            <section className="mb-8 max-w-3xl p-6 rounded-xl border border-white/20 bg-white/10 shadow-inner mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-indigo-300">
                {editingId ? "Edit Category" : "Add New Category"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                    name="name"
                    placeholder="Category Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputBase}
                    autoComplete="off"
                />
                <input
                    name="description"
                    placeholder="Description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    className={inputBase}
                    autoComplete="off"
                />
              </div>

              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                {editingId ? (
                    <>
                      <button onClick={saveEditing} className={btnGreen}>
                        Save Changes
                      </button>
                      <button onClick={cancelEditing} className={btnGray}>
                        Cancel
                      </button>
                    </>
                ) : (
                    <>
                      <button onClick={handleAddCategory} className={btnGreen}>
                        Add Category
                      </button>
                      <button
                          onClick={() => {
                            setIsAdding(false);
                            setFormData({ name: "", description: "" });
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

        {/* Categories Table */}
        <div className="overflow-x-auto rounded-lg border border-white/20 bg-white/10 shadow-lg">
          {filteredCategories.length === 0 ? (
              <p className="p-10 text-center text-white/70">No categories found.</p>
          ) : (
              <table className="w-full table-auto border-collapse text-white">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold">
                <tr>
                  <th className="px-5 py-3 text-left">Category Name</th>
                  <th className="px-5 py-3 text-left">Description</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredCategories.map((cat) =>
                    editingId === cat._id ? (
                        <tr key={cat._id} className="bg-yellow-300/20 text-black">
                          <td className="px-5 py-3">
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="px-5 py-3">
                            <input
                                name="description"
                                value={formData.description || ""}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                          </td>
                          <td className="px-5 py-3 space-x-3 whitespace-nowrap">
                            <button onClick={saveEditing} className={`${btnGreen} px-4 py-1`}>
                              Save
                            </button>
                            <button onClick={cancelEditing} className={`${btnGray} px-4 py-1`}>
                              Cancel
                            </button>
                          </td>
                        </tr>
                    ) : (
                        <tr
                            key={cat._id}
                            className="even:bg-white/10 hover:bg-purple-800/30 transition"
                        >
                          <td className="px-5 py-3">{cat.name}</td>
                          <td className="px-5 py-3">{cat.description || "—"}</td>
                          <td className="px-5 py-3 space-x-3 whitespace-nowrap">
                            <button
                                onClick={() => startEditing(cat)}
                                className={`${btnIndigo} px-4 py-1`}
                            >
                              Edit
                            </button>
                            <button
                                onClick={() => handleDeleteCategory(cat._id)}
                                className={`${btnRed} px-4 py-1`}
                            >
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
  );
};

export default CategoryManagement;
