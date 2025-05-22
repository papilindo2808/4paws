import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { UserPlus, Mail, Calendar, Key } from 'lucide-react';
import BackgroundDecorator from '../components/BackgroundDecorator';

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    birthDate: string;
}

const InputField = ({ label, type, name, value, onChange }: 
    { label: string, type: string, name: string, value: string, onChange:
         (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="mb-6 w-full">
        <label className="block font-indie text-gray-700 mb-3 text-lg">{label}:</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            className="w-full px-4 py-4 text-lg border-2 border-orange-200 rounded-xl font-inter
                     focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50
                     transition-colors duration-200"
        />
    </div>
);

const Register = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        birthDate: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (formData.password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            await register(formData);
            setSuccessMessage('Registro exitoso. Redirigiendo al login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error: any) {
            setErrorMessage(error.message || 'Error en el registro');
        }
    };

    // Redirect to /home when the token is set
    useEffect(() => {
        const token = authService.getStoredToken();
        if (token) {
            navigate('/home');
        }
    }, [navigate]);

    return (
        <div className="relative min-h-screen">
            <BackgroundDecorator />
            <main className="relative z-10 p-8">
                <div className="max-w-md mx-auto pt-40">
                    <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-orange-200">
                        <div className="flex items-center gap-3 mb-6 justify-center">
                            <UserPlus className="w-8 h-8 text-orange-500" />
                            <h2 className="font-cabin text-3xl text-orange-800">Registro</h2>
                        </div>

                        {errorMessage && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                <p className="font-inter text-red-700 text-sm">{errorMessage}</p>
                            </div>
                        )}

                        {successMessage && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                                <p className="font-inter text-green-700 text-sm">{successMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <UserPlus className="w-5 h-5 text-gray-400" />
                                    <InputField 
                                        label="Nombre de usuario" 
                                        type="text" 
                                        name="username" 
                                        value={formData.username} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <InputField 
                                        label="Correo electrónico" 
                                        type="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Key className="w-5 h-5 text-gray-400" />
                                    <InputField 
                                        label="Contraseña" 
                                        type="password" 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Key className="w-5 h-5 text-gray-400" />
                                    <InputField
                                        label="Confirmar contraseña"
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <InputField 
                                        label="Fecha de nacimiento" 
                                        type="date" 
                                        name="birthDate" 
                                        value={formData.birthDate} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-orange-500 text-white py-3 px-6 rounded-xl
                                         font-bubblegum text-lg hover:bg-orange-600 
                                         transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <UserPlus className="w-5 h-5" />
                                Registrarse
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;
