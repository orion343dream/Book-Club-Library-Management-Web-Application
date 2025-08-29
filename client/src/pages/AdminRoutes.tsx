import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
import { useAuth } from "../context/useAuth.ts";

const AdminRoutes = () => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) return <Navigate to="/" />;

    return (
        <div className="min-h-screen grid grid-cols-[260px_1fr] bg-gradient-to-tr from-indigo-900 via-blue-900 to-purple-900 text-white">
            {/* Sidebar */}
            <aside className="h-screen sticky top-0 shadow-2xl shadow-indigo-900 bg-gradient-to-br from-indigo-800 via-blue-900 to-purple-900 z-20 rounded-tr-2xl rounded-br-2xl">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="flex flex-col overflow-y-auto p-8 max-w-full scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-900 bg-white/10 rounded-tl-2xl rounded-bl-2xl">
                {/* Top header (optional) */}
                <header className="mb-6 border-b border-indigo-600 pb-4 flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-semibold text-white leading-tight">
                        Admin Dashboard
                    </h1>
                    {/* Add user menu / logout here if needed */}
                </header>

                {/* Outlet for nested routes */}
                <section className="flex-1">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default AdminRoutes;
