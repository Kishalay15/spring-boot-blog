import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import PostCard from './PostCard';
import Pagination from './Pagination';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import usePosts from '../hooks/usePosts';
import useCategories from '../hooks/useCategories';
import PostModal from './PostModal';
import { getUserById } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

function Posts() {
    const { user } = useAuth();
    const [expandedComments, setExpandedComments] = useState({});
    const [commentAuthors, setCommentAuthors] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(6);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postComments, setPostComments] = useState({});

    const { posts, loading, authors, totalPages } = usePosts(selectedCategory, currentPage, pageSize);
    const { categories, allCategories } = useCategories();

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setDropdownOpen(false);
        setCurrentPage(0);
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const openPostModal = async (post) => {
        const comments = post.comments || [];
        const authorName = authors[post.postId];

        // Fetch comment authors
        const commentAuthorsMap = { ...commentAuthors };
        for (const comment of comments) {
            if (!commentAuthorsMap[comment.userId]) {
                commentAuthorsMap[comment.userId] = await getUserById(comment.userId);
            }
        }

        // Map comments with authorName
        const enrichedComments = comments.map(c => ({
            ...c,
            authorName: commentAuthorsMap[c.userId]
        }));

        setCommentAuthors(commentAuthorsMap);
        setPostComments(prev => ({ ...prev, [post.postId]: enrichedComments }));
        setSelectedPost({ ...post, comments: enrichedComments });
    };

    const handleNewComment = (comment) => {
        setPostComments(prev => ({
            ...prev,
            [selectedPost.postId]: [...(prev[selectedPost.postId] || []), comment]
        }));
    };

    const handleCommentDelete = (postId, commentId) => {
        setPostComments(prev => ({
            ...prev,
            [postId]: prev[postId].filter(c => c.commentId !== commentId)
        }));
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    categories={categories}
                    allCategories={allCategories}
                    dropdownOpen={dropdownOpen}
                    onDropdownToggle={handleDropdownToggle}
                    onCategoryChange={handleCategoryChange}
                />

                {posts.length === 0 ? (
                    <EmptyState selectedCategory={selectedCategory} />
                ) : (
                    <div className="space-y-4 sm:space-y-6">
                        {posts.map(post => (
                            <PostCard
                                key={post.postId}
                                post={post}
                                author={authors[post.postId]}
                                categoryTitle={categories[post.categoryId]}
                                formatDate={formatDate}
                                onClick={() => openPostModal(post)}
                            />

                        ))}
                    </div>
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {selectedPost && (
                <PostModal
                    post={selectedPost}
                    author={authors[selectedPost.postId]}
                    comments={postComments[selectedPost.postId] || []}
                    currentUser={user}
                    onClose={() => setSelectedPost(null)}
                    onNewComment={handleNewComment}
                    onCommentDelete={handleCommentDelete}
                />
            )}
        </div>
    );
}

export default Posts;
