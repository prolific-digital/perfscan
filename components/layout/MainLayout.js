'use client';

import { useSelector, useDispatch } from 'react-redux';
import { selectSidebarOpen, selectTheme, setSidebarOpen } from '@/store/slices/uiSlice';
import Header from './Header';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

export default function MainLayout({ children }) {
  const sidebarOpen = useSelector(selectSidebarOpen);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <div className={cn('min-h-screen bg-gray-50', theme === 'dark' && 'dark')}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={cn(
            'flex-1 transition-all duration-300 ease-in-out',
            sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
          )}
        >
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}
    </div>
  );
}