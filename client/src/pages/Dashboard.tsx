import React, { useEffect, useState } from "react";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import RecentActivity from "../components/dashboard/RecentActivity";
import { MdLibraryBooks, MdPersonAdd, MdBook } from "react-icons/md";

import { getTotalBooksCount } from "../services/bookService";
import {
  getMonthlyLendings,
  getTotalLendingsCount,
  getTotalOverdueCount,
  type MonthlyLending,
} from "../services/lendingService";
import { getTotalReaders } from "../services/readerService";
import { getRecentActivity, type Activity } from "../services/activityService";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/Loading";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [bookCount, setBookCount] = useState<number>(0);
  const [lendingCount, setLendingCount] = useState<number>(0);
  const [overdueCount, setOverdueCount] = useState<number>(0);
  const [readers, setReaders] = useState<number>(0);
  const [monthlyLending, setMonthlyLending] = useState<MonthlyLending[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        (async () => {
          try {
            const count = await getTotalBooksCount();
            setBookCount(count);
          } catch (e) {}
        })(),
        (async () => {
          try {
            const count = await getTotalLendingsCount();
            setLendingCount(count);
          } catch (e) {}
        })(),
        (async () => {
          try {
            const count = await getTotalOverdueCount();
            setOverdueCount(count);
          } catch (e) {}
        })(),
        (async () => {
          try {
            const count = await getTotalReaders();
            setReaders(count);
          } catch (e) {}
        })(),
        (async () => {
          try {
            const data = await getMonthlyLendings();
            setMonthlyLending(data);
          } catch (e) {}
        })(),
        (async () => {
          try {
            setLoadingActivities(true);
            const activities = await getRecentActivity();
            setRecentActivities(activities);
          } catch (e) {}
          setLoadingActivities(false);
        })(),
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
      <div className="min-h-screen bg-white p-10 font-sans text-gray-900 rounded-2xl shadow-2xl max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Book Club Library
          </h1>
          <p className="text-lg text-gray-600">
            Your Library’s summary at a glance.
          </p>
        </header>

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          <StatCard
              title="Total Books"
              value={bookCount}
              icon={
                <MdLibraryBooks className="w-10 h-10 text-indigo-600 bg-indigo-100 p-1 rounded-lg shadow-inner" />
              }
              iconBg="bg-indigo-100"
          />
          <StatCard
              title="Readers"
              value={readers}
              icon={
                <MdPersonAdd className="w-10 h-10 text-green-600 bg-green-100 p-1 rounded-lg shadow-inner" />
              }
              iconBg="bg-green-100"
          />
          <StatCard
              title="Lendings"
              value={lendingCount}
              icon={
                <MdBook className="w-10 h-10 text-purple-600 bg-purple-100 p-1 rounded-lg shadow-inner" />
              }
              iconBg="bg-purple-100"
          />
          <StatCard
              title="Overdue"
              value={overdueCount}
              icon={
                <MdLibraryBooks className="w-10 h-10 text-red-600 bg-red-100 p-1 rounded-lg shadow-inner" />
              }
              iconBg="bg-red-100"
          />
        </section>

        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
          {/* Left: Chart */}
          <section className="flex-1 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700">
              Monthly Lending Trends
            </h2>
            <DashboardCharts monthlyLending={monthlyLending} />
          </section>

          {/* Right Side: Recent Activity + Quick Actions */}
          <aside className="w-full lg:w-96 flex flex-col gap-8">
            {/* Recent Activity */}
            <section className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
                Recent Activity
              </h2>
              {loadingActivities ? (
                  <p className="text-gray-500">Loading recent activities...</p>
              ) : (
                  <RecentActivity activities={recentActivities} />
              )}
            </section>

            {/* Quick Actions */}
            <section className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4 text-indigo-700">
                Quick Actions
              </h2>
              <div className="flex flex-col space-y-4">
                {[
                  {
                    icon: MdBook,
                    label: "Lend a Book",
                    onClick: () => navigate("/dashboard/lendings"),
                    bgColor: "bg-indigo-100",
                    textColor: "text-indigo-700",
                  },
                  {
                    icon: MdPersonAdd,
                    label: "Add a Reader",
                    onClick: () => navigate("/dashboard/readers"),
                    bgColor: "bg-green-100",
                    textColor: "text-green-700",
                  },
                  {
                    icon: MdLibraryBooks,
                    label: "Add a Book",
                    onClick: () => navigate("/dashboard/books"),
                    bgColor: "bg-purple-100",
                    textColor: "text-purple-700",
                  },
                ].map(({ icon: Icon, label, onClick, bgColor, textColor }) => (
                    <button
                        key={label}
                        type="button"
                        onClick={onClick}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 ${bgColor} ${textColor} hover:brightness-110`}
                    >
                      <Icon className="w-6 h-6" />
                      {label}
                    </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBg }) => (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center space-x-5 cursor-default transform transition hover:scale-[1.03]">
      <div className={`${iconBg} p-3 rounded-xl`}>{icon}</div>
      <div>
        <p className="text-indigo-400 text-sm font-semibold">{title}</p>
        <h3 className="text-3xl font-extrabold text-gray-900">{value.toLocaleString()}</h3>
      </div>
    </div>
);

export default Dashboard;
