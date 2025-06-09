import { useEffect, useState } from 'react';
import { MessageCircle, User, Clock, FileText } from 'lucide-react';
import { getUserById, getCategoryById } from '../utils/api';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState({});
    const [expandedComments, setExpandedComments] = useState({});
    const [commentAuthors, setCommentAuthors] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [categories, setCategories] = useState({});


    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:9090/api/posts?pageNumber=${currentPage}&pageSize=${pageSize}`)
            .then(res => res.json())
            .then(async data => {
                const postList = data.content || [];
                setPosts(postList);
                setTotalPages(data.totalPages);

                const newAuthors = {};
                const newCategories = {};

                for (const post of postList) {
                    // Fetch author
                    const name = await getUserById(post.userId);
                    newAuthors[post.postId] = name;

                    // Fetch category if not already cached
                    if (!newCategories[post.categoryId]) {
                        const category = await getCategoryById(post.categoryId);
                        newCategories[post.categoryId] = category.categoryTitle;
                    }
                }

                setAuthors(newAuthors);
                setCategories(prev => ({ ...prev, ...newCategories }));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [currentPage]);



    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };


    const handleToggleComments = async (postId, comments) => {
        setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));

        const newCommentAuthors = { ...commentAuthors };
        for (const comment of comments) {
            if (!newCommentAuthors[comment.userId]) {
                newCommentAuthors[comment.userId] = await getUserById(comment.userId);
            }
        }
        setCommentAuthors(newCommentAuthors);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        <span className="ml-3 text-purple-600 font-medium">Loading posts...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {posts.length === 0 ? (
                    <div className="text-center py-12 sm:py-16">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full mb-4">
                            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No posts available</h3>
                        <p className="text-gray-500 text-sm sm:text-base">Check back later for new content</p>
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-6">
                        {posts.map(post => (
                            <article
                                key={post.postId}
                                className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-purple-100 p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow duration-200"
                            >
                                {/* Post Header */}
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                                    {post.postTitle}
                                </h2>

                                {/* Post Meta */}
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4 sm:mb-6 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                                        <span className="truncate">{authors[post.postId] || `User #${post.userId}`}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MessageCircle className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                                        <span>
                                            {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <FileText className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                                        <span>{categories[post.categoryId] || 'Uncategorized'}</span>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <div className="prose prose-gray max-w-none mb-4 sm:mb-6">
                                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                                        {post.postContent}
                                    </p>
                                </div>

                                {/* Post Footer */}
                                <div className="pt-4 sm:pt-6 border-t border-gray-100">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                                        <button
                                            onClick={() => handleToggleComments(post.postId, post.comments)}
                                            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors self-start"
                                        >
                                            <MessageCircle className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-sm font-medium">
                                                {expandedComments[post.postId] ? 'Hide Comments' : 'View Comments'}
                                            </span>
                                        </button>
                                        <div className="text-xs text-gray-400 flex items-center self-start sm:self-auto">
                                            <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                                            {formatDate(post.addedDate)}
                                        </div>
                                    </div>

                                    {/* Comments Section */}
                                    {expandedComments[post.postId] && (
                                        <div className="mt-4 space-y-3">
                                            {post.comments.map(comment => (
                                                <div
                                                    key={comment.commentId}
                                                    className="bg-purple-50 border border-purple-100 p-3 sm:p-4 rounded-lg"
                                                >
                                                    <p className="text-sm sm:text-base text-gray-700 mb-2 leading-relaxed">
                                                        {comment.content}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-500">
                                                        — {commentAuthors[comment.userId] || `User #${comment.userId}`}, {formatDate(comment.addedDate)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
            {totalPages > 1 && (
                <div className="mt-10 flex justify-center flex-wrap gap-2 pb-5">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentPage === 0}
                        className="px-3 py-1 bg-purple-200 text-purple-800 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`px-3 py-1 rounded ${currentPage === i
                                ? "bg-purple-600 text-white"
                                : "bg-purple-100 text-purple-700"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                        disabled={currentPage === totalPages - 1}
                        className="px-3 py-1 bg-purple-200 text-purple-800 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Posts;
