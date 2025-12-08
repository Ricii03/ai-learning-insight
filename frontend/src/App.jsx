import React, { useState, useEffect } from "react";
import { Frame } from "./screens/Frame/Frame"; 
import Dashboard from "./screens/Dashboard";
import { users } from "./data/users"; 
import AuthScreen from "./screens/AuthScreen/AuthScreen"; 
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Main App Content (with auth context)
const AppContent = () => {
    const { isAuthenticated, loading } = useAuth();
    const [showInsight, setShowInsight] = useState(false);
    
    // Ambil data pengguna aktif (user pertama) setelah login
    const activeUserData = users[0]; 

    // Show loading while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a3a5a]"></div>
                    <p className="mt-4 text-gray-600">Memuat...</p>
                </div>
            </div>
        );
    }

    // 0. Jika BELUM LOGIN, tampilkan AuthScreen
    if (!isAuthenticated) {
        return <AuthScreen />;
    }

    // 1. Jika sudah LOGIN dan ingin melihat Insight, tampilkan Frame
    if (showInsight) {
        return (
            <Frame
                onGoBack={() => setShowInsight(false)}
                userData={activeUserData} 
            />
        );
    }

    // 2. Jika sudah LOGIN dan TIDAK di halaman Insight, tampilkan Dashboard
    return (
        <Dashboard 
            setShowInsight={setShowInsight} 
        />
    );
};

// App with Auth Provider
export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}