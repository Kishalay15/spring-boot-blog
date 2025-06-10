import { FileText } from 'lucide-react';

export default function EmptyState({ selectedCategory }) {
    return (
        <div className="text-center py-12 sm:py-16">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full mb-4">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {selectedCategory === 'all' ? 'No posts available' : 'No posts in this category'}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
                {selectedCategory === 'all'
                    ? 'Check back later for new content'
                    : 'Try selecting a different category or check back later'
                }
            </p>
        </div>
    );
}
