// ProfilePage.jsx
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { User, Mail, FileText, List } from 'lucide-react';
import UserPostsLists from './UserPostsLists';

const ProfilePage = () => {
    const { user, fetchUserProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('info');

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

                {/* Tabs */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setActiveTab('info')}
                        className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === 'info'
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-100 text-purple-800'
                            }`}
                    >
                        User Info
                    </button>
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`px-4 py-2 font-medium rounded-t-lg ${activeTab === 'posts'
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-100 text-purple-800'
                            }`}
                    >
                        My Posts
                    </button>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
                    {activeTab === 'info' && (
                        <div className="p-8 space-y-6">
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
                    )}

                    {activeTab === 'posts' && (
                        <div className="p-4">
                            <UserPostsLists userId={user?.id} />
                        </div>
                    )}
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
