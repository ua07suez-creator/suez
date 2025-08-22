import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Home,
  FileText,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
  User,
  Shield,
  Bell
} from 'lucide-react';

export default function Navigation() {
  const { user, client, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      path: '/dashboard',
      label: 'لوحة المعلومات',
      icon: Home,
      show: true
    },
    {
      path: '/cases',
      label: 'الملفات',
      icon: FileText,
      show: user?.user_type !== 'client'
    },
    {
      path: '/messages',
      label: 'المراسلات',
      icon: MessageSquare,
      show: true
    },
    {
      path: '/invoices',
      label: 'الفواتير',
      icon: DollarSign,
      show: true
    },
    {
      path: '/admin',
      label: 'الإدارة',
      icon: Shield,
      show: user?.user_type === 'admin'
    }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* الشعار */}
        <Link to="/dashboard" className="flex items-center space-x-2 space-x-reverse">
          <div className="p-2 bg-navy-light rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-navy-dark">
              نظام التخليص الجمركي
            </h1>
            <p className="text-xs text-gray-600">
              Customs Clearance System
            </p>
          </div>
        </Link>

        {/* روابط التنقل */}
        <div className="hidden md:flex items-center space-x-4 space-x-reverse">
          {navigationItems.filter(item => item.show).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-navy-light text-white'
                    : 'text-gray-600 hover:text-navy-light hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* معلومات المستخدم */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* جرس الإشعارات */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              3
            </Badge>
          </Button>

          {/* قائمة المستخدم */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.full_name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {user?.user_type === 'admin' ? 'مدير عام' :
                     user?.user_type === 'employee' ? 'موظف' :
                     user?.user_type === 'accountant' ? 'محاسب' :
                     user?.user_type === 'support' ? 'دعم فني' :
                     'عميل'}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-gray-900">
                  {user?.full_name}
                </p>
                <p className="text-xs text-gray-600">
                  {user?.email}
                </p>
                {client?.company_name && (
                  <p className="text-xs text-gray-500">
                    {client.company_name}
                  </p>
                )}
              </div>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center space-x-2 space-x-reverse">
                  <User className="h-4 w-4" />
                  <span>الملف الشخصي</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center space-x-2 space-x-reverse">
                  <Settings className="h-4 w-4" />
                  <span>الإعدادات</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={handleLogout}
                className="flex items-center space-x-2 space-x-reverse text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* التنقل المحمول */}
      <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-around">
          {navigationItems.filter(item => item.show).slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 p-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-navy-light'
                    : 'text-gray-600 hover:text-navy-light'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
