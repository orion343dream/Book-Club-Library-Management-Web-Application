import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAuditLogs } from "../services/auditService";
import type { AuditLog } from "../types/AuditLog";
import Loading from "../components/PageLoading";

const AuditLogsPage: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getAuditLogs()
            .then((res) => {
                if (Array.isArray(res)) {
                    setLogs(res);
                } else {
                    console.error("Unexpected response format:", res);
                    setError("Invalid audit log format received.");
                }
            })
            .catch((err) => {
                console.error("Audit fetch error:", err);
                toast.error("Failed to fetch audit logs");
                setError("Failed to fetch audit logs.");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-indigo-800 via-blue-900 to-purple-900">
                <Loading />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8 rounded-2xl bg-gradient-to-tr from-indigo-800 via-blue-900 to-purple-900 text-white shadow-2xl mt-8">
            {/* Header */}
            <h1 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
                Audit Logs
            </h1>

            {error && <p className="text-red-400 text-center mb-6">{error}</p>}

            {logs.length === 0 ? (
                <p className="text-white/70 text-center py-10">No audit logs found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-white/20 shadow-lg">
                    <table className="w-full table-auto border-collapse text-white text-sm">
                        <thead>
                        <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold">
                            <th className="border border-white/10 px-4 py-2 text-left">Timestamp</th>
                            <th className="border border-white/10 px-4 py-2 text-left">User</th>
                            <th className="border border-white/10 px-4 py-2 text-left capitalize">Action</th>
                            <th className="border border-white/10 px-4 py-2 text-left">Entity</th>
                            <th className="border border-white/10 px-4 py-2 text-left">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.map((log) => (
                            <tr key={log._id} className="hover:bg-white/5 transition even:bg-white/10 odd:bg-white/5">
                                <td className="border border-white/10 px-4 py-2 align-top">
                                    {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td className="border border-white/10 px-4 py-2 align-top">
                                    {log.user?.name || "Unknown"}
                                    <br />
                                    <span className="text-xs text-white/60">{log.user?.email}</span>
                                </td>
                                <td className="border border-white/10 px-4 py-2 align-top">
                                    {log.action.toLowerCase()}
                                </td>
                                <td className="border border-white/10 px-4 py-2 align-top">{log.entity}</td>
                                <td className="border border-white/10 px-4 py-2 align-top">
                                    {log.description || "-"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AuditLogsPage;
