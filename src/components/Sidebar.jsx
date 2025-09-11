import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
    Home, 
    Users, 
    Calendar, 
    Activity, 
    Settings, 
    ChevronLeft, 
    ChevronRight,
    Stethoscope,
    Brain,
    FileText
} from 'lucide-react';
import logo from '../assets/Logo.png';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
        { id: 'doctors', label: 'Doctors', icon: Users, path: '/admin/doctors' },
        { id: 'patients', label: 'Patients', icon: Stethoscope, path: '/admin/patients' },
        { id: 'appointments', label: 'Appointments', icon: Calendar, path: '/admin/appointments' },
        { id: 'ai-reports', label: 'AI Reports', icon: Brain, path: '/admin/ai-reports' },
        { id: 'reports', label: 'Reports', icon: FileText, path: '/admin/reports' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 h-screen flex flex-col ${
            isCollapsed ? 'w-16' : 'w-64'
        }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                {!isCollapsed ? (
                    <div className="flex items-center">
                        <img 
                            src={logo} 
                            alt="Doctor AI Logo" 
                            className="w-16 h-16 object-contain"
                        />
                    </div>
                ) : (
                    <div className="flex justify-center w-full">
                        <img 
                            src={logo} 
                            alt="Doctor AI Logo" 
                            className="w-16 h-16 object-contain"
                        />
                    </div>
                )}
                <button
                    onClick={toggleCollapse}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    ) : (
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleNavigation(item.path)}
                            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                isActive
                                    ? 'bg-pink-50 text-pink-600 border border-pink-200'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            {!isCollapsed && (
                                <span className="font-medium">{item.label}</span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            {!isCollapsed && (
                <div className="mt-auto p-4">
                    <div className="bg-pink-50 rounded-xl p-3 border border-pink-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                            <span className="text-sm font-medium text-pink-600">AI Status</span>
                        </div>
                        <p className="text-xs text-gray-600">All systems operational</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
