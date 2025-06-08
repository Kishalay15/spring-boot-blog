import React from 'react';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                    <div className="text-center">
                        <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-purple-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Your Blog!</h1>
                        <p className="text-gray-600 mb-8">You're successfully logged in</p>

                        <div className="bg-purple-50 p-6 rounded-lg mb-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">User Information</h2>
                            <p className="text-gray-600">User ID: {user.id}</p>
                            <p className="text-gray-600">Email: {user.email}</p>
                        </div>

                        <button
                            onClick={logout}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
