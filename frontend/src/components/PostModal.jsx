import { useState } from 'react';
import { createComment, deleteComment, getUserById } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const PostModal = ({ post, author, comments, onClose, onNewComment, onCommentDelete }) => {
    const { user: currentUser } = useAuth();
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [localComments, setLocalComments] = useState(comments || []);
    const [commentAuthors, setCommentAuthors] = useState({});

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const comment = await createComment({
                postId: post.postId,
                userId: currentUser.id,
                content: newComment
            });

            const authorName = await getUserById(currentUser.id);

            const enrichedComment = {
                ...comment,
                authorName
            };

            setLocalComments(prev => [...prev, enrichedComment]);
            setNewComment('');
            onNewComment(enrichedComment);
        } catch (err) {
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId, commentUserId) => {
        const isPostOwner = post.userId === currentUser.id;
        const isCommentOwner = commentUserId === currentUser.id;

        if (!isPostOwner && !isCommentOwner) {
            return alert("You don't have permission to delete this comment.");
        }

        try {
            await deleteComment(commentId);
            setLocalComments(prev => prev.filter(c => c.commentId !== commentId));
            onCommentDelete(post.postId, commentId);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative overflow-hidden max-h-[95vh] flex flex-col animate-in fade-in duration-300">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5 text-white">
                    <button
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200 text-white hover:text-white"
                        onClick={onClose}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-2xl font-bold pr-12 leading-tight">{post.title}</h2>
                    <div className="flex items-center mt-2 text-purple-100">
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium">By {author}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <div className="prose max-w-none mb-8">
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{post.content}</p>
                        </div>

                        {/* Comments Section */}
                        <div className="border-t border-gray-100 pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    Comments
                                </h3>
                                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                                    {localComments.length}
                                </span>
                            </div>

                            <div className="space-y-4 mb-6">
                                {localComments.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 font-medium">No comments yet</p>
                                        <p className="text-gray-300 text-sm">Be the first to share your thoughts!</p>
                                    </div>
                                ) : (
                                    localComments.map((comment, index) => (
                                        <div key={comment.commentId} className="bg-gray-50 rounded-xl p-4 relative hover:bg-gray-100 transition-colors duration-200" style={{ animationDelay: `${index * 100}ms` }}>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center mb-2">
                                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                                                            <span className="text-white text-sm font-semibold">
                                                                {(comment.authorName || `User #${comment.userId}`).charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-semibold text-gray-700">
                                                            {comment.authorName || `User #${comment.userId}`}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-800 leading-relaxed ml-11">{comment.content}</p>
                                                </div>
                                                {(currentUser?.id === comment.userId || currentUser?.id === post.userId) && (
                                                    <button
                                                        className="ml-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 flex-shrink-0"
                                                        onClick={() => handleDeleteComment(comment.commentId, comment.userId)}
                                                        title="Delete comment"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Add Comment Form */}
                            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-semibold">
                                            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Share your thoughts..."
                                            rows={3}
                                            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                        />
                                        <div className="flex justify-between items-center mt-3">
                                            <span className="text-xs text-gray-400">
                                                {newComment.length}/500 characters
                                            </span>
                                            <button
                                                onClick={handleAddComment}
                                                disabled={submitting || !newComment.trim()}
                                                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                                            >
                                                {submitting ? (
                                                    <>
                                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>Posting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                        </svg>
                                                        <span>Post Comment</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;
