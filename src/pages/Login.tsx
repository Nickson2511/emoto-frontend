import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import api from '../services/api';
import { setCredentials } from '../features/auth/authSlice';
import SuccessModal from '../shared/components/modals/SuccessModal';

/* ================= GOOGLE TYPES ================= */

interface GoogleCredentialResponse {
    credential: string;
    select_by?: string;
}

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: {
                        client_id: string;
                        callback: (response: GoogleCredentialResponse) => void;
                    }) => void;
                    renderButton: (
                        parent: HTMLElement | null,
                        options: Record<string, unknown>
                    ) => void;
                };
            };
        };
    }
}

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isRegister = location.state?.mode === 'register';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    /* ================= GOOGLE LOGIN ================= */

    const handleGoogleLogin = useCallback(
        async (response: GoogleCredentialResponse) => {
            try {
                const res = await api.post('/auth/google', {
                    idToken: response.credential,
                });

                const { user, accessToken } = res.data.data;

                dispatch(setCredentials({ user, accessToken }));
                localStorage.setItem(
                    'auth',
                    JSON.stringify({ user, accessToken })
                );

                if (user.role === 'admin') navigate('/admin');
                else navigate('/');
            } catch {
                alert('Google login failed');
            }
        },
        [dispatch, navigate]
    );

    useEffect(() => {
        if (!window.google) return;

        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
            callback: handleGoogleLogin,
        });

        window.google.accounts.id.renderButton(
            document.getElementById('googleSignInDiv'),
            {
                theme: 'outline',
                size: 'large',
                width: 250,
                text: 'continue_with',
            }
        );
    }, [handleGoogleLogin]);

    /* ================= EMAIL LOGIN ================= */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isRegister) {
                await api.post('/auth/register', {
                    name,
                    email,
                    password,
                });

                setSuccessMessage('Account created successfully! Please login.');
                return;
            }

            const res = await api.post('/auth/login', {
                email,
                password,
            });

            const { user, accessToken } = res.data.data;

            dispatch(setCredentials({ user, accessToken }));
            localStorage.setItem(
                'auth',
                JSON.stringify({ user, accessToken })
            );

            if (user.role === 'admin') navigate('/admin');
            else navigate('/');
        } catch (err: unknown) {
            const error = err as AxiosError<{ message: string }>;
            alert(error.response?.data?.message || 'Login/Register failed');
        }
    };

    const handleCloseSuccess = () => {
        setSuccessMessage(null);
        navigate('/login', { replace: true });
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md w-80"
                >
                    <h2 className="text-xl font-bold mb-4 text-center">
                        {isRegister ? 'Create Account' : 'Login'}
                    </h2>

                    {isRegister && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mb-3 p-2 border rounded"
                            required
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-3 p-2 border rounded"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-3 p-2 border rounded"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-400 text-sm">OR</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    {/* GOOGLE BUTTON */}
                    <div className="flex justify-center">
                        <div id="googleSignInDiv"></div>
                    </div>

                    {!isRegister ? (
                        <p className="mt-4 text-sm text-gray-500 text-center">
                            Don&apos;t have an account?{' '}
                            <span
                                onClick={() =>
                                    navigate('/login', {
                                        state: { mode: 'register' },
                                    })
                                }
                                className="text-orange-500 cursor-pointer hover:underline"
                            >
                                Create Account
                            </span>
                        </p>
                    ) : (
                        <p className="mt-4 text-sm text-gray-500 text-center">
                            Already have an account?{' '}
                            <span
                                onClick={() =>
                                    navigate('/login', { replace: true })
                                }
                                className="text-orange-500 cursor-pointer hover:underline"
                            >
                                Login
                            </span>
                        </p>
                    )}
                </form>
            </div>

            {successMessage && (
                <SuccessModal
                    message={successMessage}
                    onClose={handleCloseSuccess}
                />
            )}
        </>
    );
};

export default Login;




