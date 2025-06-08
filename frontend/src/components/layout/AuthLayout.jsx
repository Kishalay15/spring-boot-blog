import React, { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

const AuthLayout = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {isLogin ? (
                    <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
                ) : (
                    <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
                )}
            </div>
        </div>
    );
};

export default AuthLayout;
