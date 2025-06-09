// ProfilePage.jsx
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { User, Mail, FileText } from 'lucide-react';

const ProfilePage = () => {
    const { user, fetchUserProfile } = useAuth();

    useEffect(() => {
        if (user?.id) {
            fetchUserProfile(user.id);
        }
    }, [user?.id, fetchUserProfile]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Profile Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-purple-900 mb-2">User Profile</h1>
                    <p className="text-purple-600">Manage your account information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white">Account Details</h2>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* User ID */}
                        <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                                <User className="w-5 h-5 text-purple-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <label className="block text-sm font-medium text-purple-900 mb-1">User ID</label>
                                <p className="text-purple-800 font-mono text-sm bg-white px-3 py-2 rounded-lg border border-purple-200">
                                    {user?.id || 'Not available'}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-purple-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <label className="block text-sm font-medium text-purple-900 mb-1">Email Address</label>
                                <p className="text-purple-800 bg-white px-3 py-2 rounded-lg border border-purple-200 break-all">
                                    {user?.email || 'Not available'}
                                </p>
                            </div>
                        </div>

                        {/* About */}
                        <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-purple-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <label className="block text-sm font-medium text-purple-900 mb-1">About</label>
                                <div className="text-purple-800 bg-white px-3 py-2 rounded-lg border border-purple-200 min-h-[60px]">
                                    {user?.about ? (
                                        <p className="whitespace-pre-wrap">{user.about}</p>
                                    ) : (
                                        <p className="text-purple-500 italic">No description provided</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className="bg-gray-50 px-8 py-4 border-t border-purple-100">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-md hover:shadow-lg">
                                Edit Profile
                            </button>
                            <button className="flex-1 border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-all duration-200">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-purple-600">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
