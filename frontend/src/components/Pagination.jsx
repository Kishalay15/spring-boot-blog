export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-10 flex justify-center flex-wrap gap-2 pb-5">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
                disabled={currentPage === 0}
                className="px-3 py-1 bg-purple-200 text-purple-800 rounded disabled:opacity-50"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 rounded ${currentPage === i
                        ? "bg-purple-600 text-white"
                        : "bg-purple-100 text-purple-700"
                        }`}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 bg-purple-200 text-purple-800 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
