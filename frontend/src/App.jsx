import React, { useState } from "react";
import { Frame } from "./screens/Frame/Frame"; 
import Dashboard from "./screens/Dashboard";
import { users } from "./data/users"; 
import AuthScreen from "./screens/AuthScreen/AuthScreen"; 

export default function App() {
    const [isLoggedIn, setLoggedIn] = useState(false); 
    const [showInsight, setShowInsight] = useState(false);
    
    // Ambil data pengguna aktif (user pertama) setelah login
    const activeUserData = users[0]; 

    // 0. Jika BELUM LOGIN, tampilkan AuthScreen
    if (!isLoggedIn) {
        // setLoggedIn disalurkan agar AuthScreen bisa mengalihkan ke Dashboard
        return <AuthScreen setLoggedIn={setLoggedIn} />;
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
}