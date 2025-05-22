import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Key } from 'lucide-react';
import BackgroundDecorator from '../components/BackgroundDecorator';

const InputField = ({ label, type, name, value, onChange }: 
    { label: string, type: string, name: string, value: string, onChange:
         (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="mb-4">
        <label className="block font-indie text-gray-700 mb-2">{label}:</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl font-inter
                     focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50
                     transition-colors duration-200"
        />
    </div>
);

const Login = () => {   
    const [user, setUser] = useState({ username: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login(user.username, user.password);
            navigate('/', { replace: true });
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="relative min-h-screen">
            <BackgroundDecorator />
            <main className="relative z-10 p-8">
                <div className="max-w-md mx-auto pt-50">
                    <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-orange-200">
                        <div className="flex items-center gap-3 mb-6 justify-center">
                            <LogIn className="w-8 h-8 text-orange-500" />
                            <h2 className="font-cabin text-3xl text-orange-800">Iniciar Sesión</h2>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                <p className="font-inter text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <InputField 
                                label="Nombre de usuario" 
                                type="text" 
                                name="username" 
                                value={user.username} 
                                onChange={handleChange} 
                            />
                            <InputField 
                                label="Contraseña" 
                                type="password" 
                                name="password" 
                                value={user.password} 
                                onChange={handleChange} 
                            />

                            <button 
                                type="submit" 
                                className="w-full bg-orange-500 text-white py-3 px-6 rounded-xl
                                         font-bubblegum text-lg hover:bg-orange-600 
                                         transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <Key className="w-5 h-5" />
                                Iniciar Sesión
                            </button>
                        </form>

                        <p className="text-center mt-6 font-indie text-gray-600">
                            ¿No tienes una cuenta?{' '}
                            <Link to="/register" className="text-orange-500 hover:text-orange-600 transition-colors duration-200">
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
