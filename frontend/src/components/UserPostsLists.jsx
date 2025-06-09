import { useEffect, useState } from 'react';
import { Pencil, Trash, X, Save, AlertCircle, MoreVertical } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPostsByUserId, fetchCategories } from '../utils/api';

const UserPostsList = ({ userId }) => {
    const [posts, setPosts] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [editForm, setEditForm] = useState({ postTitle: '', postContent: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(null);
    const [categoryMap, setCategoryMap] = useState({});
    const [activeDropdown, setActiveDropdown] = useState(null);

    const token = localStorage.getItem('token');

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/categories/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const map = {};
            response.data.forEach((cat) => {
                map[cat.categoryId] = cat.categoryTitle;
            });
            setCategoryMap(map);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        }
    };

    // Fetch user posts
    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const postsData = await fetchPostsByUserId(userId);
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Failed to fetch posts');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, [userId]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Delete post with confirmation modal
    const handleDelete = async (postId, postTitle) => {
        const confirmDelete = () => {
            return new Promise((resolve) => {
                const toastId = toast.custom((t) => (
                    <div className="bg-white p-4 rounded-lg shadow-lg border border-red-200 max-w-md">
                        <div className="flex items-center space-x-3 mb-3">
                            <AlertCircle className="w-6 h-6 text-red-500" />
                            <h3 className="font-semibold text-gray-900">Delete Post</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Are you sure you want to delete "{postTitle}"? This action cannot be undone.
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => {
                                    toast.dismiss(toastId);
                                    resolve(true);
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    toast.dismiss(toastId);
                                    resolve(false);
                                }}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ), { duration: Infinity });
            });
        };

        const shouldDelete = await confirmDelete();
        if (!shouldDelete) return;

        setActiveDropdown(null);
        try {
            setIsDeleting(postId);
            await axios.delete(`http://localhost:9090/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Post deleted successfully!');
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Failed to delete post');
        } finally {
            setIsDeleting(null);
        }
    };

    // Open edit modal
    const handleEdit = (post) => {
        setEditingPost(post);
        setEditForm({
            postTitle: post.postTitle,
            postContent: post.postContent
        });
        setIsEditModalOpen(true);
        setActiveDropdown(null);
    };

    // Close edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditingPost(null);
        setEditForm({ postTitle: '', postContent: '' });
    };

    // Save edited post
    const handleSaveEdit = async () => {
        if (!editForm.postTitle.trim() || !editForm.postContent.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setIsLoading(true);
            await axios.put(
                `http://localhost:9090/api/user/${userId}/category/${editingPost.categoryId}/posts/${editingPost.postId}`,
                {
                    postTitle: editForm.postTitle,
                    postContent: editForm.postContent,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success('Post updated successfully!');
            closeEditModal();
            fetchPosts();
        } catch (error) {
            console.error('Error updating post:', error);
            toast.error('Failed to update post');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleDropdown = (postId, e) => {
        e.stopPropagation();
        setActiveDropdown(activeDropdown === postId ? null : postId);
    };

    if (isLoading && posts.length === 0) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-right" />

            <div className="space-y-4">
                {posts.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-purple-600 text-lg">No posts to show.</p>
                        <p className="text-purple-500 text-sm mt-2">Create your first post to get started!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div
                            key={post.postId}
                            className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-purple-100 hover:shadow-lg transition-shadow duration-200"
                        >
                            {/* Mobile Layout */}
                            <div className="block sm:hidden">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-lg text-purple-900 flex-1 pr-2 break-words">
                                        {post.postTitle}
                                    </h3>
                                    <div className="relative flex-shrink-0">
                                        <button
                                            onClick={(e) => toggleDropdown(post.postId, e)}
                                            className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg transition-all duration-200"
                                            title="More options"
                                        >
                                            <MoreVertical className="w-5 h-5" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeDropdown === post.postId && (
                                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.postId, post.postTitle)}
                                                    disabled={isDeleting === post.postId}
                                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                                >
                                                    {isDeleting === post.postId ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                                            <span>Deleting...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Trash className="w-4 h-4" />
                                                            <span>Delete</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p className="text-purple-700 text-sm leading-relaxed mb-3 break-words">
                                    {post.postContent}
                                </p>

                                <div className="text-xs text-purple-500 break-words">
                                    <div>Category: {categoryMap[post.categoryId] || 'Unknown'}</div>
                                    <div className="mt-1">
                                        Added on: {new Date(post.addedDate).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Layout */}
                            <div className="hidden sm:flex justify-between items-start">
                                <div className="flex-1 mr-4 min-w-0">
                                    <h3 className="font-bold text-lg text-purple-900 mb-2 break-words">
                                        {post.postTitle}
                                    </h3>
                                    <p className="text-purple-700 text-sm leading-relaxed line-clamp-3 break-words">
                                        {post.postContent}
                                    </p>
                                    <div className="mt-3 text-xs text-purple-500">
                                        Category: {categoryMap[post.categoryId] || 'Unknown'} •{' '}
                                        Added on: {new Date(post.addedDate).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </div>
                                </div>

                                <div className="flex space-x-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg transition-all duration-200"
                                        title="Edit post"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.postId, post.postTitle)}
                                        disabled={isDeleting === post.postId}
                                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200 disabled:opacity-50"
                                        title="Delete post"
                                    >
                                        {isDeleting === post.postId ? (
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                                        ) : (
                                            <Trash className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Edit Post</h2>
                            <button
                                onClick={closeEditModal}
                                className="text-white hover:text-purple-200 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                            <div>
                                <label className="block text-sm font-medium text-purple-900 mb-2">
                                    Post Title *
                                </label>
                                <input
                                    type="text"
                                    value={editForm.postTitle}
                                    onChange={(e) => setEditForm({ ...editForm, postTitle: e.target.value })}
                                    className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white text-gray-900 placeholder-gray-500"
                                    placeholder="Enter post title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-purple-900 mb-2">
                                    Post Content *
                                </label>
                                <textarea
                                    value={editForm.postContent}
                                    onChange={(e) => setEditForm({ ...editForm, postContent: e.target.value })}
                                    rows={8}
                                    className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-vertical bg-white text-gray-900 placeholder-gray-500"
                                    placeholder="Enter post content"
                                />
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
                            <button
                                onClick={closeEditModal}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                disabled={isLoading}
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all disabled:opacity-50 flex items-center space-x-2"
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserPostsList;
