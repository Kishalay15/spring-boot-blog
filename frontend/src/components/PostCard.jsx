import { MessageCircle, User, Clock, FileText } from 'lucide-react';

export default function PostCard({
    post,
    author,
    categoryTitle,
    formatDate,
    onClick,
}) {
    return (
        <article
            className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-purple-100 p-4 sm:p-6 lg:p-8 hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={onClick}
        >
            {/* Post Header */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                {post.postTitle}
            </h2>

            {/* Post Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4 sm:mb-6 text-sm text-gray-500">
                <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                    <span className="truncate">{author || `User #${post.userId}`}</span>
                </div>
                <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                    <span>
                        {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                    </span>
                </div>
                <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                    <span>{categoryTitle || 'Uncategorized'}</span>
                </div>
            </div>

            {/* Post Content Preview */}
            <div className="prose prose-gray max-w-none mb-4 sm:mb-6">
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg line-clamp-3">
                    {post.postContent}
                </p>
            </div>

            {/* Post Footer */}
            <div className="pt-4 sm:pt-6 border-t border-gray-100">
                <div className="text-xs text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                    {formatDate(post.addedDate)}
                </div>
            </div>
        </article>
    );
}
