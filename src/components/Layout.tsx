import { Link, Outlet } from 'react-router-dom';
import ConnectButtonWithHooks from '../config/ConnectButtonWithHooks';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Top Navigation Bar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-gray-900 border-b border-gray-800 shadow-md">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">L</div>
          <Link to="/">
            <h1 className="text-2xl font-black text-white tracking-tight hover:text-blue-400 transition-colors">LeoFundMe</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Dashboard</Link>
          <ConnectButtonWithHooks />
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}