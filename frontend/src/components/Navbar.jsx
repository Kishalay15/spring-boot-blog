import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-purple-900 to-purple-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/posts"
                        className="text-xl md:text-2xl font-bold hover:text-purple-200 transition-colors duration-200"
                    >
                        MyBlog
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className="border-2 border-white hover:border-purple-300 px-4 py-2 rounded-lg hover:bg-white hover:text-purple-800 transition-all duration-200 font-medium"
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={goToProfile}
                                    className="p-2 rounded-lg hover:bg-purple-700 hover:bg-opacity-50 transition-all duration-200"
                                    title="Profile"
                                >
                                    <User className="w-6 h-6" />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="border-2 border-white hover:border-purple-300 px-4 py-2 rounded-lg hover:bg-white hover:text-purple-800 transition-all duration-200 font-medium"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg hover:bg-purple-700 hover:bg-opacity-50 transition-all duration-200"
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
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-purple-700">
                        <div className="px-2 pt-2 pb-3 space-y-2">
                            {user ? (
                                <>
                                    <button
                                        onClick={goToProfile}
                                        className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg hover:bg-purple-700 hover:bg-opacity-50 transition-all duration-200"
                                    >
                                        <User className="w-5 h-5" />
                                        <span>Profile</span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 rounded-lg border-2 border-white hover:border-purple-300 hover:bg-white hover:text-purple-800 transition-all duration-200 font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="w-full text-left px-3 py-2 rounded-lg border-2 border-white hover:border-purple-300 hover:bg-white hover:text-purple-800 transition-all duration-200 font-medium"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
