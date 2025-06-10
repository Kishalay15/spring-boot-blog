export default function LoadingSpinner() {
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
