import { useState, useEffect } from 'react';
import { Plus, Save, X } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { fetchCategories } from '../utils/api';

const AddPost = ({ userId, categoryId, onPostAdded }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                toast.error('Failed to load categories');
                console.error('Category load error:', err);
            }
        };
        loadCategories();
    }, []);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPostTitle('');
        setPostContent('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!postTitle.trim() || !postContent.trim()) {
            toast.error('Please fill in both title and content.');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('No token found. Please log in.');
            return;
        }

        setIsLoading(true);
        try {
            await axios.post(
                `http://localhost:9090/api/user/${userId}/category/${selectedCategory}/posts`,
                { postTitle, postContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success('Post added successfully!');
            setPostTitle('');
            setPostContent('');
            closeModal();

            if (onPostAdded) {
                onPostAdded();
            }
        } catch (error) {
            console.error('Error adding post:', error);
            toast.error('Failed to add post. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Toaster position="top-right" />

            <div className="bg-white p-6 rounded-2xl shadow-xl border border-purple-100 mb-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                        <Plus className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-purple-900">Create New Post</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-purple-900 mb-2">
                            Select Category *
                        </label>
                        <select
                            value={selectedCategory || ''}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white text-gray-900"
                        >
                            {categories.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryTitle}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-purple-900 mb-2">
                            Post Title *
                        </label>
                        <input
                            type="text"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white text-gray-900 placeholder-gray-500"
                            placeholder="Enter an engaging title for your post"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-purple-900 mb-2">
                            Post Content *
                        </label>
                        <textarea
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            rows={6}
                            className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-vertical bg-white text-gray-900 placeholder-gray-500"
                            placeholder="Share your thoughts, ideas, or story here..."
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-900 transition-all disabled:opacity-50 flex items-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            <span>{isLoading ? 'Creating Post...' : 'Create Post'}</span>
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
};

export default AddPost;
