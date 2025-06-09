import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Menu, X, Plus, LogOut, Home } from 'lucide-react';
import AddPost from './AddPost';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAddPostOpen, setIsAddPostOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && user) {
            logout();
        }
    }, [user, logout]);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const handleLogin = () => {
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const goToProfile = () => {
        navigate('/profile');
        setIsMobileMenuOpen(false);
    };

    const goToHome = () => {
        navigate('/posts');
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const openAddPostModal = () => {
        setIsAddPostOpen(true);
        setIsMobileMenuOpen(false);
    };

    const closeAddPostModal = () => {
        setIsAddPostOpen(false);
    };

    return (
        <>
            <nav className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 text-white shadow-2xl sticky top-0 z-40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 lg:h-18">
                        {/* Logo */}
                        <Link
                            to="/posts"
                            className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent hover:from-purple-200 hover:to-white transition-all duration-300 transform hover:scale-105"
                        >
                            MyBlog
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-3">
                            {user ? (
                                <div className="flex items-center space-x-3">
                                    {/* Home Button */}
                                    <button
                                        onClick={goToHome}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-800/50 hover:bg-purple-700/70 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                        title="Home"
                                    >
                                        <Home className="w-4 h-4" />
                                        <span>Home</span>
                                    </button>

                                    {/* Add Post Button */}
                                    <button
                                        onClick={openAddPostModal}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                                        title="Create New Post"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>New Post</span>
                                    </button>

                                    {/* Profile Button */}
                                    <button
                                        onClick={goToProfile}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-800/50 hover:bg-purple-700/70 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                        title="Profile"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Profile</span>
                                    </button>

                                    {/* Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-white/30 hover:border-white/60 hover:bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="px-6 py-2 rounded-xl border-2 border-white/40 hover:border-white/70 hover:bg-white/10 text-white transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg"
                                >
                                    Login
                                </button>
                            )}
                        </div>

                        {/* Mobile/Tablet Navigation */}
                        <div className="lg:hidden flex items-center space-x-2">
                            {user && (
                                <button
                                    onClick={openAddPostModal}
                                    className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 hover:scale-110"
                                    title="Add Post"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            )}

                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-lg hover:bg-purple-700/50 transition-all duration-300 hover:scale-110"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                            ? 'max-h-96 opacity-100 border-t border-purple-700/50'
                            : 'max-h-0 opacity-0 overflow-hidden'
                        }`}>
                        <div className="px-2 py-4 space-y-2">
                            {user ? (
                                <>
                                    <button
                                        onClick={goToHome}
                                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-purple-700/50 transition-all duration-300 group"
                                    >
                                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="font-medium">Home</span>
                                    </button>

                                    <button
                                        onClick={goToProfile}
                                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl hover:bg-purple-700/50 transition-all duration-300 group"
                                    >
                                        <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="font-medium">Profile</span>
                                    </button>

                                    <button
                                        onClick={openAddPostModal}
                                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl bg-purple-600/70 hover:bg-purple-600 transition-all duration-300 group"
                                    >
                                        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="font-medium">Create Post</span>
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 font-medium group"
                                    >
                                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span>Logout</span>
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-white/40 hover:border-white/70 hover:bg-white/10 transition-all duration-300 font-medium text-center"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Modal Overlay */}
            {isAddPostOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-300">
                        <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-4 border-b border-purple-100 rounded-t-2xl">
                            <button
                                onClick={closeAddPostModal}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-purple-100 text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-110"
                                title="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-bold text-purple-900 pr-12">Create New Post</h2>
                        </div>

                        <div className="p-6">
                            <AddPost
                                userId={user?.id}
                                categoryId={1}
                                onPostAdded={closeAddPostModal}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
