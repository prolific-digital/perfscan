'use client';

import { useSelector, useDispatch } from 'react-redux';
import { selectSidebarOpen, setSidebarOpen } from '@/store/slices/uiSlice';
import { selectUser } from '@/store/slices/authSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaTachometerAlt,
  FaServer,
  FaChartLine,
  FaExclamationTriangle,
  FaFileAlt,
  FaCog,
  FaExpand,
  FaCompress,
  FaUsers,
  FaCalendarAlt,
  FaDatabase
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Real-Time Monitor',
    href: '/dashboard',
    icon: FaTachometerAlt,
    description: 'Live system monitoring'
  },
  {
    name: 'Systems',
    href: '/systems',
    icon: FaServer,
    description: 'Manage IBM systems'
  },
  {
    name: 'Performance Insights',
    icon: FaChartLine,
    description: 'Historical analysis',
    children: [
      { name: 'Historical Data', href: '/historical-data' },
      { name: 'Period vs Period', href: '/period-comparison' },
      { name: 'What\'s Changed', href: '/whats-changed' },
      { name: 'Problem Determination', href: '/problem-determination' }
    ]
  },
  {
    name: 'Capacity Planning',
    href: '/capacity-planning',
    icon: FaExpand,
    description: 'Capacity analysis & planning'
  },
  {
    name: 'Alerts',
    href: '/alerts',
    icon: FaExclamationTriangle,
    description: 'System alerts & events'
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: FaFileAlt,
    description: 'Generate & schedule reports'
  },
  {
    name: 'Settings',
    icon: FaCog,
    description: 'System configuration',
    children: [
      { name: 'Users', href: '/settings/users' },
      { name: 'Alert Rules', href: '/settings/alerts' },
      { name: 'Report Templates', href: '/settings/templates' },
      { name: 'System Configuration', href: '/settings/systems' }
    ]
  }
];

export default function Sidebar() {
  const sidebarOpen = useSelector(selectSidebarOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const NavItem = ({ item, level = 0 }) => {
    const isActive = pathname === item.href || 
      (item.children && item.children.some(child => pathname === child.href));
    
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <div className="space-y-1">
          <div className={cn(
            'flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer',
            isActive 
              ? 'bg-blue-100 text-blue-700' 
              : 'text-gray-700 hover:bg-gray-100'
          )}>
            <Icon className={cn('flex-shrink-0 h-5 w-5', sidebarOpen ? 'mr-3' : '')} />
            {sidebarOpen && (
              <>
                <span className="flex-1">{item.name}</span>
                <FaCompress className="h-4 w-4" />
              </>
            )}
          </div>
          
          {sidebarOpen && (
            <div className="ml-6 space-y-1">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    'block px-3 py-2 text-sm rounded-md',
                    pathname === child.href
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {child.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        className={cn(
          'flex items-center px-3 py-2 text-sm font-medium rounded-md group',
          isActive 
            ? 'bg-blue-100 text-blue-700' 
            : 'text-gray-700 hover:bg-gray-100'
        )}
      >
        <Icon className={cn('flex-shrink-0 h-5 w-5', sidebarOpen ? 'mr-3' : '')} />
        {sidebarOpen && <span>{item.name}</span>}
        
        {!sidebarOpen && (
          <div className="absolute left-16 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {item.name}
            {item.description && (
              <div className="text-gray-300 text-xs">{item.description}</div>
            )}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out',
        sidebarOpen ? 'w-64' : 'w-16',
        'lg:translate-x-0 lg:static lg:inset-0'
      )}
    >
      {/* Sidebar content */}
      <div className="flex flex-col flex-1 min-h-0 pt-16">
        <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-3 space-y-1">
            {navigationItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>

        {/* User info at bottom */}
        {sidebarOpen && user && (
          <div className="flex-shrink-0 px-3 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.fullName?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}