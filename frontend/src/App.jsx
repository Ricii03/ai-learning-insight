import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Frame } from "./screens/Frame/Frame"; 
import Dashboard from "./screens/Dashboard";
import AuthScreen from "./screens/AuthScreen/AuthScreen"; 

// Inner component that uses AuthContext
function AppContent() {
    const { user, isAuthenticated, loading } = useAuth();
    const [showInsight, setShowInsight] = useState(false);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a3a5a] mx-auto"></div>
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
                userData={user} 
            />
        );
    }

    // 2. Jika sudah LOGIN dan TIDAK di halaman Insight, tampilkan Dashboard
    return (
        <Dashboard 
            setShowInsight={setShowInsight}
            user={user}
        />
    );
}

// Main App component with AuthProvider
export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}