import { useAuth } from '../../context/AuthContext';
import NotificationBell from "../../components/NotificationBell";

export default function UserDashboard() {
  const { user, logout } = useAuth();

  const notification =
    user?.status === "approved"
      ? "🎉 Your account has been approved! You can now access all features."
      : "";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <h1 className="text-xl font-semibold">
          Welcome, {user?.name} 👋
        </h1>

        <div className="flex items-center gap-4">
          <NotificationBell count={notification ? 1 : 0} />

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg mt-5 shadow">
          {notification}
        </div>
      )}

      {/* Dashboard Main Content */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">User Dashboard</h2>

        <p className="text-gray-600">
          This is your dashboard. Once the admin approves your registration, you will gain access to all features.
        </p>
      </div>
    </div>
  );
}