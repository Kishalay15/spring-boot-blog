import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { User, Mail, FileText, List, Calendar, Settings } from 'lucide-react';
import UserPostsLists from './UserPostsLists';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';
import EditUserModal from './EditUserModal';

const ProfilePage = () => {
    const { user, fetchUserProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('info');
    const [postCount, setPostCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user?.id) {
            fetchUserProfile(user.id);
        }
    }, [user?.id, fetchUserProfile]);

    const fetchStats = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token being sent:", token);

            const [postsRes, commentsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/users/${userId}/posts/count`),
                axios.get(`${API_BASE_URL}/users/${userId}/comments/count`),
            ]);

            setPostCount(postsRes.data.count || 0);
            setCommentCount(commentsRes.data.count || 0);
        } catch (error) {
            if (error.response) {
                console.log("Backend error response:", error.response.data);
            }
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchStats(user.id); // Separate to avoid race condition
        }
    }, [user?.id]);


    const handleUserUpdate = (updatedUser) => {
        fetchUserProfile(updatedUser.id);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-12">
                        <div className="absolute top-6 right-6">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
                            >
                                <Settings className="w-5 h-5" />
                            </button>

                        </div>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-purple-600">
                                        {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center sm:text-left text-white">
                                <h1 className="text-3xl font-bold mb-2">
                                    {user?.name || user?.email?.split('@')[0] || 'User'}
                                </h1>
                                <p className="text-purple-100 mb-1">{user?.email}</p>
                                <div className="flex items-center justify-center sm:justify-start text-purple-100 text-sm">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>Member since {new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="border-b border-gray-100">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('info')}
                                className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${activeTab === 'info'
                                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                                    : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                                    }`}
                            >
                                <User className="w-5 h-5" />
                                <span>Profile Info</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('posts')}
                                className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${activeTab === 'posts'
                                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                                    : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                                    }`}
                            >
                                <FileText className="w-5 h-5" />
                                <span>My Posts</span>
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                        {activeTab === 'info' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="grid gap-6 md:grid-cols-1">
                                    {/* Email Section */}
                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Address</h3>
                                                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                                                    <p className="text-gray-700 font-medium break-all">
                                                        {user?.email || 'Not available'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* About Section */}
                                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                                                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm min-h-[120px]">
                                                    {user?.about ? (
                                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{user.about}</p>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center h-full text-center py-4">
                                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                                                <FileText className="w-6 h-6 text-gray-300" />
                                                            </div>
                                                            <p className="text-gray-400 font-medium mb-1">No description yet</p>
                                                            <p className="text-gray-300 text-sm">Tell others about yourself</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Section */}
                                    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-xl p-8 border border-purple-100 shadow-lg">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-gray-800 flex items-center">
                                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                                    <List className="w-4 h-4 text-white" />
                                                </div>
                                                Account Statistics
                                            </h3>
                                            <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                                Live Stats
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="group bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200">
                                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                                    <FileText className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="text-3xl font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors duration-300">
                                                    {postCount}
                                                </div>
                                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                                    Posts Published
                                                </div>
                                            </div>
                                            <div className="group bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200">
                                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="text-3xl font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors duration-300">
                                                    {commentCount}
                                                </div>
                                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                                    Comments Made
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'posts' && (
                            <div className="animate-in fade-in duration-300">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">My Posts</h2>
                                    <p className="text-gray-600">Manage and view all your published content</p>
                                </div>
                                <UserPostsLists userId={user?.id} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">
                            Profile last updated on {new Date().toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
            <EditUserModal
                userId={user?.id}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdate={handleUserUpdate}
            />
        </div>
    );
};

export default ProfilePage;
