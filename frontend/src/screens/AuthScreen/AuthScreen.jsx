import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PRIMARY_COLOR = '#1a3a5a';
const HOVER_COLOR = '#254C75';
const InputField = ({ id, label, type = 'text', value, onChange, placeholder }) => (
    <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out shadow-sm"
        />
    </div>
);

// Formulir Login 
const LoginForm = ({ onLoginSuccess, onSwitch }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const result = await login(email, password);
            if (result.success) {
                onLoginSuccess();
            } else {
                setError(result.error || 'Login gagal. Periksa email dan password Anda.');
            }
        } catch (err) {
            setError('Terjadi kesalahan saat login. Silakan coba lagi.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
                id="login-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masukkan email Anda"
            />
            <InputField
                id="login-password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="masukkan password Anda"
            />

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                </div>
            )}
            
            <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[${PRIMARY_COLOR}] hover:bg-[${HOVER_COLOR}] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${PRIMARY_COLOR}] transition duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Memproses...
                    </>
                ) : (
                    <>
                        <LogIn className="w-4 h-4 mr-2" />
                        Masuk
                    </>
                )}
            </button>
            
            <p className="text-center text-sm text-gray-600">
                Belum punya akun?{' '}
                <a 
                    href="#" 
                    onClick={() => onSwitch('register')} 
                    className="font-medium text-blue-600 hover:text-blue-500"
                >
                    Daftar di sini
                </a>
            </p>
        </form>
    );
};

// Formulir Register 
const RegisterForm = ({ onRegisterSuccess, onSwitch }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register attempt:', { name, email, password });
        
        setTimeout(() => {
            onRegisterSuccess(); 
        }, 1000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
                id="register-name"
                label="Nama Lengkap"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="nama lengkap Anda"
            />
            <InputField
                id="register-email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email aktif Anda"
            />
            <InputField
                id="register-password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="buat password minimal 6 karakter"
            />

            <button
                type="submit"
                className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[${PRIMARY_COLOR}] hover:bg-[${HOVER_COLOR}] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${PRIMARY_COLOR}] transition duration-150`}
            >
                <UserPlus className="w-4 h-4 mr-2" />
                Daftar Sekarang
            </button>
            
            <p className="text-center text-sm text-gray-600">
                Sudah punya akun?{' '}
                <a 
                    href="#" 
                    onClick={() => onSwitch('login')} 
                    className={`font-medium text-[${PRIMARY_COLOR}] hover:text-[${HOVER_COLOR}]`}
                >
                    Masuk
                </a>
            </p>
        </form>
    );
};

// Formulir Utama AuthScreen
const AuthScreen = () => {
    const { isAuthenticated } = useAuth();
    const [mode, setMode] = useState('login'); 
    
    const handleLoginSuccess = () => {
        // Login success is handled by AuthContext
        // No need to do anything here as the App will re-render
    };

    // Register functionality - for now just show alert
    // TODO: Implement register API endpoint
    const handleRegisterSuccess = () => {
        alert('Fitur pendaftaran belum tersedia. Silakan hubungi administrator untuk membuat akun.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
                <div>
                    <img 
                        className="mx-auto h-12 w-auto" 
                        src="/dicoding.png" 
                        alt="Dicoding Logo"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x48/FFFFFF/000000?text=LOGO"; }}
                    />
                    <h2 className="mt-6 text-center text-2xl font-semibold text-[#0d1c31]">
                        {mode === 'login' ? 'Masuk ke Akun Anda' : 'Buat Akun Baru'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {mode === 'login' ? 'Selamat datang kembali!' : 'Daftar sekarang untuk memulai belajar!'}
                    </p>
                </div>
                
                {mode === 'login' ? (
                    <LoginForm 
                        onLoginSuccess={handleLoginSuccess} 
                        onSwitch={setMode} 
                    />
                ) : (
                    <RegisterForm 
                        onRegisterSuccess={handleRegisterSuccess} 
                        onSwitch={setMode} 
                    />
                )}

            </div>
        </div>
    );
};

export default AuthScreen;