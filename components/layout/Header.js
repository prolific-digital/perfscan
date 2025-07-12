'use client';

import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectUser, 
  logout 
} from '@/store/slices/authSlice';
import { 
  selectSidebarOpen, 
  toggleSidebar,
  showToast 
} from '@/store/slices/uiSlice';
import { selectUnreadAlertCount } from '@/store/slices/alertsSlice';
import { 
  FaBars, 
  FaBell, 
  FaUser, 
  FaSignOutAlt, 
  FaCog,
  FaSearch 
} from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const sidebarOpen = useSelector(selectSidebarOpen);
  const unreadAlerts = useSelector(state => state.alerts?.unreadCount || 0);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
    dispatch(showToast({ 
      message: 'Successfully logged out', 
      type: 'success' 
    }));
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaBars className="h-5 w-5" />
            </button>
            
            <div className="flex items-center ml-4">
              <Image
                src="/perfscan-logo.png"
                alt="PerfScan"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                PerfScan
              </h1>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search systems, jobs, alerts..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Alerts */}
            <button 
              onClick={() => router.push('/alerts')}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaBell className="h-5 w-5" />
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadAlerts > 9 ? '9+' : unreadAlerts}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="h-4 w-4" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user?.fullName || 'User'}
                </span>
              </button>

              {/* User dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <div className="font-medium">{user?.fullName}</div>
                      <div className="text-gray-500">{user?.email}</div>
                    </div>
                    
                    <button
                      onClick={() => {
                        router.push('/profile');
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="mr-3 h-4 w-4" />
                      Profile
                    </button>
                    
                    <button
                      onClick={() => {
                        router.push('/settings');
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaCog className="mr-3 h-4 w-4" />
                      Settings
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-3 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}