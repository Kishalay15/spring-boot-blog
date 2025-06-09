// import { useEffect, useState } from 'react';
// import { MessageCircle, User, Clock, FileText } from 'lucide-react';
// import { getUserById } from '../utils/api';

// function Posts() {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [authors, setAuthors] = useState({});
//     const [expandedComments, setExpandedComments] = useState({}); // postId: true/false
//     const [commentAuthors, setCommentAuthors] = useState({}); // comment.userId -> name

//     useEffect(() => {
//         fetch('http://localhost:9090/api/posts/')
//             .then(res => res.json())
//             .then(async data => {
//                 const postList = data.content || [];
//                 setPosts(postList);

//                 // Fetch author names for all posts
//                 const newAuthors = {};
//                 for (const post of postList) {
//                     const name = await getUserById(post.userId);
//                     newAuthors[post.postId] = name;
//                 }
//                 setAuthors(newAuthors);
//                 setLoading(false);
//             })
//             .catch(() => setLoading(false));
//     }, []);

//     const handleToggleComments = async (postId, comments) => {
//         setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));

//         // Fetch names for comment authors if not already cached
//         const newCommentAuthors = { ...commentAuthors };
//         for (const comment of comments) {
//             if (!newCommentAuthors[comment.userId]) {
//                 newCommentAuthors[comment.userId] = await getUserById(comment.userId);
//             }
//         }
//         setCommentAuthors(newCommentAuthors);
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
//                 <div className="max-w-4xl mx-auto px-6 py-12">
//                     <div className="flex items-center justify-center">
//                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
//                         <span className="ml-3 text-purple-600 font-medium">Loading posts...</span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
//             <div className="max-w-4xl mx-auto px-6 py-12">
//                 <div className="text-center mb-12">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
//                         <FileText className="w-8 h-8 text-purple-600" />
//                     </div>
//                     <h1 className="text-4xl font-bold text-gray-900 mb-2">Public Blog Posts</h1>
//                     <p className="text-gray-600">Discover insights and stories from our community</p>
//                 </div>

//                 {posts.length === 0 ? (
//                     <div className="text-center py-16">
//                         <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts available</h3>
//                         <p className="text-gray-500">Check back later for new content</p>
//                     </div>
//                 ) : (
//                     <div className="space-y-6">
//                         {posts.map(post => (
//                             <article
//                                 key={post.postId}
//                                 className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 hover:shadow-md transition-shadow duration-200"
//                             >
//                                 <h2 className="text-2xl font-bold text-gray-900 mb-4">{post.postTitle}</h2>

//                                 <div className="flex items-center space-x-6 mb-4 text-sm text-gray-500">
//                                     <div className="flex items-center">
//                                         <User className="w-4 h-4 mr-2 text-purple-400" />
//                                         <span>{authors[post.postId] || `User #${post.userId}`}</span>
//                                     </div>
//                                     <div className="flex items-center">
//                                         <MessageCircle className="w-4 h-4 mr-2 text-purple-400" />
//                                         <span>{post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}</span>
//                                     </div>
//                                 </div>

//                                 <p className="text-gray-700 leading-relaxed text-lg mb-4">{post.postContent}</p>

//                                 <div className="mt-6 pt-6 border-t border-gray-100">
//                                     <div className="flex items-center justify-between">
//                                         <button
//                                             onClick={() => handleToggleComments(post.postId, post.comments)}
//                                             className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
//                                         >
//                                             <MessageCircle className="w-4 h-4" />
//                                             <span className="text-sm font-medium">
//                                                 {expandedComments[post.postId] ? 'Hide Comments' : 'View Comments'}
//                                             </span>
//                                         </button>
//                                         <div className="text-xs text-gray-400">
//                                             <Clock className="w-3 h-3 inline mr-1" />
//                                             Just now
//                                         </div>
//                                     </div>

//                                     {/* Comments Section */}
//                                     {expandedComments[post.postId] && (
//                                         <div className="mt-4 space-y-3">
//                                             {post.comments.map(comment => (
//                                                 <div
//                                                     key={comment.commentId}
//                                                     className="bg-purple-50 border border-purple-100 p-3 rounded"
//                                                 >
//                                                     <p className="text-sm text-gray-700">{comment.content}</p>
//                                                     <p className="text-xs text-gray-500 mt-1">
//                                                         — {commentAuthors[comment.userId] || `User #${comment.userId}`}
//                                                     </p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             </article>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Posts;


import { useEffect, useState } from 'react';
import { MessageCircle, User, Clock, FileText } from 'lucide-react';
import { getUserById } from '../utils/api';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState({});
    const [expandedComments, setExpandedComments] = useState({}); // postId: true/false
    const [commentAuthors, setCommentAuthors] = useState({}); // comment.userId -> name

    useEffect(() => {
        fetch('http://localhost:9090/api/posts')
            .then(res => res.json())
            .then(async data => {
                const postList = data.content || [];
                setPosts(postList);

                // Fetch author names for all posts
                const newAuthors = {};
                for (const post of postList) {
                    const name = await getUserById(post.userId);
                    newAuthors[post.postId] = name;
                }
                setAuthors(newAuthors);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit',
        });
    };


    const handleToggleComments = async (postId, comments) => {
        setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));

        // Fetch names for comment authors if not already cached
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
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full mb-4">
                        <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Public Blog Posts</h1>
                    <p className="text-gray-600 text-sm sm:text-base px-4">Discover insights and stories from our community</p>
                </div>

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
        </div>
    );
}

export default Posts;
