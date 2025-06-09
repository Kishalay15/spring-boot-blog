import { createContext, useContext, useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:9090';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
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

                const userObj = { id: data.userId, email };
                setUser(userObj);

                localStorage.setItem('user', JSON.stringify(userObj));

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
        localStorage.removeItem('user');
        setUser(null);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

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

    // NEW: fetch full user profile
    const fetchUserProfile = async (userId) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data); // update user object fully (id, email, about, etc.)
            } else {
                console.error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, fetchUserProfile, isLoading }}>
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
