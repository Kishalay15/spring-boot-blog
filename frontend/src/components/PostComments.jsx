export default function PostComments({ comments, commentAuthors, formatDate }) {
    return (
        <div className="mt-4 space-y-3">
            {comments.map(comment => (
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
    );
}
