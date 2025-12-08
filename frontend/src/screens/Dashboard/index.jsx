import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../Frame/Frame';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react'; 

const Header = ({ user, onLogout }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Get first letter of display name for avatar
    const getInitial = (name) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    // Format display name
    const getDisplayName = () => {
        if (!user?.displayName) return 'User';
        return user.displayName
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const handleLogout = () => {
        onLogout();
        setShowDropdown(false);
    };

    return (
        <header className="bg-white shadow">
            <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <img 
                        src="/dicoding.png" 
                        alt="dicoding logo" 
                        className="h-10 w-auto"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x40/FFFFFF/000000?text=LOGO"; }}
                    />
                    <nav className="hidden md:flex space-x-4 text-sm text-gray-600">
                        <a href="#" className="font-bold text-black">Home</a>
                        <a href="#">Academy</a>
                        <a href="#">Challenge</a>
                        <a href="#">Event</a>
                        <a href="#">Job</a>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    
                    {/* User Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-[#1a3a5a] focus:ring-offset-2 rounded-full"
                        >
                            <div className="w-8 h-8 rounded-full bg-yellow-300 border-2 border-white shadow flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-yellow-400 transition">
                                {getInitial(user?.displayName)}
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {getDisplayName()}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1 truncate">
                                        {user?.email || 'No email'}
                                    </p>
                                </div>

                                {/* Menu Items */}
                                <div className="py-1">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 mr-3 text-gray-500" />
                                        Keluar / Ganti Akun
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

const Dashboard = ({ setShowInsight }) => {
    const { user, loading, logout } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Get user data from localStorage or context
        if (user) {
            setUserData(user);
        } else {
            // Try to get from localStorage
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                try {
                    setUserData(JSON.parse(savedUser));
                } catch (e) {
                    console.error('Error parsing user data:', e);
                }
            }
        }
    }, [user]);

    // Format display name for greeting
    const getDisplayName = () => {
        if (!userData) return 'Pengguna';
        
        // Convert displayName to readable format
        // anggit_andreansyah -> Anggit Andreansyah
        const name = userData.displayName || '';
        return name
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a3a5a]"></div>
                    <p className="mt-4 text-gray-600">Memuat data...</p>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        // Component will automatically re-render and show AuthScreen
        // because isAuthenticated will be false
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header user={userData} onLogout={handleLogout} />
            
            {/* Welcome */}
            <div className="bg-[#0d1c31] px-4 py-10">
                <div className="max-w-6xl mx-auto px-4 lg:px-6"> 
                    <h1 className="text-white text-2xl font-bold mb-2">
                        Selamat datang {getDisplayName()}!
                    </h1>
                    <p className="text-white/80 mb-6">
                        Semoga aktivitas belajarmu menyenangkan.
                    </p>
                    
                    {/* Status Card */}
                    <div className="bg-white rounded-lg p-4 flex items-center justify-between shadow-md">
                        <h2 className="font-bold text-gray-800">Status Langganan</h2>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-4">
                                Langganan telah berakhir. Berlangganan kembali untuk melanjutkan aktivitas belajar Anda.
                            </span>
                            <button className="bg-[#1a3a5a] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#254C75] transition">
                                Lanjut berlangganan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:px-6"> 
                
                {/* Academic Programs */}
                <Card className="bg-white">
                    <CardHeader className="p-6 pb-2"> 
                        <CardTitle className="flex items-center text-lg font-bold text-gray-700">
                            <img 
                                src="/kotak.png" 
                                alt="Academic Programs Icon"
                                className="w-6 h-6 mr-2" 
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/24x24/FFFFFF/000000?text=I"; }}
                            />
                            Academic Programs
                        </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="px-6 pt-0 pb-6">
                        <div className="border border-gray-200 rounded-lg p-6 relative"> 
                            <div className="flex justify-between items-start pb-3 mb-3"> 
                                <p className="font-semibold text-gray-800 pt-1">Asah</p> 
                                
                                <button 
                                    className="bg-[#1a3a5a] text-white text-xs font-semibold py-1.5 px-3 rounded-md hover:bg-[#254C75] transition-all"
                                >
                                    Ke dashboard
                                </button>
                            </div>
                            
                            <hr className="mb-4 mt-0 border-gray-200" />
                            
                            {/* Deskripsi, Robot, dan TOMBOL  */}
                            <div className="bg-white p-4 rounded-lg shadow-md w-3/4 max-w-[200px]"> 
                                <p className="text-gray-700 text-sm mb-2 leading-snug">
                                    Aku udah intip learning habit kamu nih... ada hal surprising yang perlu kamu tahu
                                </p>
                                <img 
                                    src="/robot.png" 
                                    alt="Robot Assistant"
                                    className="w-full h-auto object-contain max-h-[100px]"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/FFFFFF/0d1c31?text=ROBOT+AI"; }}
                                />
                                {/* MENAMBAH TOMBOL "Lihat Insight Saya!" */}
                                <button
                                    className="w-full mt-3 bg-[#1a3a5a] text-white text-xs font-bold py-2 rounded-md hover:bg-[#254C75] transition-all"
                                    onClick={() => setShowInsight(true)}
                                >
                                    Lihat Insight Saya!
                                </button>
                            </div>
                            
                        </div>
                    </CardContent>
                </Card>
                
                {/* Aktivitas Belajar  */}
                <Card className="bg-white">
                    <CardHeader className="p-6 pb-2"> 
                        <CardTitle className="flex items-center text-lg font-bold text-gray-700">
                            <img 
                                src="/kotak.png" 
                                alt="Aktivitas Belajar Icon"
                                className="w-6 h-6 mr-2" 
                              
                            /> Aktivitas Belajar
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="px-6 pt-0 pb-6">
                        <div className="border border-gray-200 rounded-lg p-6 relative">
                            <div className="border-b border-gray-200 pb-3 mb-3">
                                <p className="text-gray-500 mb-2 text-sm">Sedang dipelajari</p>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-[#0d1c31]">
                                        Belajar Fundamental Back-End dengan
                                    </p>
                                    <a href="#" className="text-blue-600 hover:underline text-sm font-semibold">
                                        Lanjutkan
                                    </a>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;