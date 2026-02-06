import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from '../services/api';
import { setCredentials } from '../features/auth/authSlice';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isRegister) {
                // Registration (users only)
                await api.post('/auth/register', { name, email, password });
                alert('Registration successful! Please login.');
                setIsRegister(false);
                return;
            }

            // Login
            const res = await api.post('/auth/login', { email, password });
            const { user, accessToken } = res.data.data;

            // Save in Redux
            dispatch(setCredentials({ user, accessToken }));

            // Redirect based on role
            if (user.role === 'admin') navigate('/admin');
            else navigate('/');
        } catch (err) {
            // Axios error typing
            const error = err as AxiosError<{ message: string }>;
            alert(error.response?.data?.message || 'Login/Register failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-80"
            >
                <h2 className="text-xl font-bold mb-4">
                    {isRegister ? 'Create Account' : 'Login'}
                </h2>

                {isRegister && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-3 p-2 border rounded"
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
                >
                    {isRegister ? 'Register' : 'Login'}
                </button>

                {!isRegister ? (
                    <p className="mt-2 text-sm text-gray-500 text-center">
                        Don&apos;t have an account?{' '}
                        <span
                            onClick={() => setIsRegister(true)}
                            className="text-orange-500 cursor-pointer hover:underline"
                        >
                            Create Account
                        </span>
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-gray-500 text-center">
                        Already have an account?{' '}
                        <span
                            onClick={() => setIsRegister(false)}
                            className="text-orange-500 cursor-pointer hover:underline"
                        >
                            Login
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
