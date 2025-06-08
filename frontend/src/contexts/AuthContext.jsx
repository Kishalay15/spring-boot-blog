import { createContext, useContext, useState } from 'react';

const BASE_URL = 'http://localhost:9090';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.jwtToken);
                setUser({ id: data.userId, email });
                return { success: true };
            } else {
                const error = await response.json();
                return { success: false, error: error.message || 'Login failed' };
            }
        } catch (error) {
            return { success: false, error: 'Network error. Please try again.' };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };


    const register = async (userData) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                return { success: true, data };
            } else {
                const error = await response.json();
                return { success: false, error: error.message || 'Registration failed' };
            }
        } catch (error) {
            return { success: false, error: 'Network error. Please try again.' };
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
