/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  GraduationCap, LogOut, Bell, Settings, BarChart3, Users, 
  DollarSign, CheckCircle, Navigation, Award, Shield, Menu, X 
} from 'lucide-react';
import { SCHOOL_INFO } from '../schoolData';

interface AdminLayoutProps {
  children: React.ReactNode;
  setView: (view: string) => void;
  activeModule: string;
  setActiveModule: (module: string) => void;
  userRole: 'admin' | 'teacher' | 'parent';
}

export default function AdminLayout({ 
  children, 
  setView, 
  activeModule, 
  setActiveModule, 
  userRole 
}: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Generate Menu Items depending on active ERP role
  const getMenuItems = () => {
    switch (userRole) {
      case 'teacher':
        return [
          { id: 'attendance', label: 'Mark Attendance', icon: CheckCircle },
          { id: 'students', label: 'My Students', icon: Users },
          { id: 'settings', label: 'My Schedules', icon: Settings }
        ];
      case 'parent':
        return [
          { id: 'dashboard', label: 'Academic Overview', icon: BarChart3 },
          { id: 'fees', label: 'Fee Payments', icon: DollarSign },
          { id: 'attendance', label: 'Attendance History', icon: CheckCircle },
          { id: 'transport', label: 'Live Bus (GPS)', icon: Navigation }
        ];
      default: // admin
        return [
          { id: 'dashboard', label: 'ERP Dashboard', icon: BarChart3 },
          { id: 'students', label: 'Student Directory', icon: Users },
          { id: 'fees', label: 'Fee Management', icon: DollarSign },
          { id: 'attendance', label: 'Attendance Log', icon: CheckCircle },
          { id: 'transport', label: 'Transport GPS', icon: Navigation },
          { id: 'staff', label: 'Staff Management', icon: Award },
          { id: 'settings', label: 'Portal Config', icon: Settings },
        ];
    }
  };

  const getProfileDetails = () => {
    switch (userRole) {
      case 'teacher':
        return { name: "Mrs. Sunita Choudhary", roleText: "Vice Principal & Teacher", short: "SC" };
      case 'parent':
        return { name: "Mr. Rajesh Sharma", roleText: "Parent (Aarav's Father)", short: "RS" };
      default:
        return { name: "Mr. Mahendra Saini", roleText: "Managing Director", short: "MS" };
    }
  };

  const menuItems = getMenuItems();
  const profile = getProfileDetails();

  const handleLogout = () => {
    setView('home');
    setActiveModule('dashboard');
  };

  const mockNotifications = [
    { text: "New admission form received from Divyansh Yadav for UKG.", time: "10 mins ago" },
    { text: "Monthly attendance tally is ready for verification.", time: "2 hrs ago" },
    { text: "Bus Route 1 reported delayed by 5 mins due to road crossing.", time: "4 hrs ago" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col hidden md:flex fixed h-full shadow-2xl z-20 border-r border-blue-900/40">
        <div className="p-6 flex items-center gap-3 border-b border-blue-900/60 bg-blue-950">
          <div className="bg-yellow-500 p-2 rounded-xl">
            <GraduationCap className="h-6 w-6 text-blue-950" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm tracking-wider uppercase text-yellow-500 leading-none">ECA Portal</h2>
            <p className="text-[10px] text-blue-300 font-bold mt-1 tracking-widest uppercase">{userRole} console</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1.5 px-4">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeModule === item.id 
                      ? 'bg-yellow-500 text-blue-950 font-black shadow-lg shadow-yellow-500/10' 
                      : 'text-blue-200 hover:bg-blue-900/40 hover:text-white'
                  }`}
                  id={`sidebar-item-${item.id}`}
                >
                  <item.icon className={`h-5 w-5 mr-3 ${activeModule === item.id ? 'text-blue-950' : 'text-yellow-500'}`} />
                  <span className="text-sm font-semibold">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-900/60 bg-blue-950">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-bold text-sm cursor-pointer"
            id="sidebar-logout"
          >
            <LogOut className="h-5 w-5 mr-3" /> Sign Out Portal
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="bg-white h-20 border-b border-gray-200/80 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-sm">
          
          <div className="flex items-center gap-3">
            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              aria-label="Toggle Mobile Sidebar"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-lg sm:text-2xl font-black text-blue-950 capitalize tracking-tight">
              {activeModule === 'dashboard' ? `${userRole} Dashboard` : activeModule.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-900 transition-colors relative cursor-pointer"
                id="notification-bell-btn"
              >
                <Bell className="h-5.5 w-5.5" />
                <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 p-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                    <h4 className="font-extrabold text-blue-950 text-sm">ERP Notifications</h4>
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">3 New</span>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {mockNotifications.map((notif, idx) => (
                      <div key={idx} className="p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-gray-100/50">
                        <p className="text-xs text-gray-700 font-semibold leading-normal">{notif.text}</p>
                        <span className="text-[10px] text-gray-400 block mt-1">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="mt-3 w-full py-2 bg-blue-50 text-blue-900 font-bold text-xs rounded-xl hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    Close Notification Panel
                  </button>
                </div>
              )}
            </div>

            {/* Profile badge */}
            <div className="flex items-center space-x-3 border-l pl-4 sm:pl-6 border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-extrabold text-blue-950 leading-tight">{profile.name}</p>
                <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest mt-0.5">{profile.roleText}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-950 font-black border-2 border-yellow-500 shadow-sm">
                {profile.short}
              </div>
            </div>

          </div>
        </header>

        {/* Dynamic Content Frame */}
        <div className="flex-1 p-4 sm:p-8 overflow-y-auto bg-slate-50/60 relative">
          {children}
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-blue-950/40 backdrop-blur-xs z-40 md:hidden"
        ></div>
      )}

      {/* Mobile Sidebar Drawer */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-blue-950 text-white flex flex-col z-50 transform md:hidden transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-blue-900/60 bg-blue-950">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 p-2 rounded-xl">
              <GraduationCap className="h-5 w-5 text-blue-950" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm tracking-wider uppercase text-yellow-500 leading-none">ECA Portal</h2>
              <p className="text-[9px] text-blue-300 font-bold mt-1 tracking-widest uppercase">{userRole} console</p>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-yellow-500 p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1 px-4">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => { setActiveModule(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center px-4 py-3 rounded-xl transition-all cursor-pointer ${
                    activeModule === item.id 
                      ? 'bg-yellow-500 text-blue-950 font-black shadow-lg' 
                      : 'text-blue-200 hover:bg-blue-900/40 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3 text-yellow-500" />
                  <span className="text-sm font-semibold">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-900/60 bg-blue-950">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-bold text-sm cursor-pointer"
          >
            <LogOut className="h-5 w-5 mr-3" /> Sign Out Portal
          </button>
        </div>
      </aside>

    </div>
  );
}
