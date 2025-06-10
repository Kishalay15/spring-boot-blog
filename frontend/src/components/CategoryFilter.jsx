import { Filter, ChevronDown } from 'lucide-react';

export default function CategoryFilter({
    selectedCategory,
    categories,
    allCategories,
    dropdownOpen,
    onDropdownToggle,
    onCategoryChange
}) {
    return (
        <div className="mb-6 sm:mb-8">
            <div className="relative inline-block text-left">
                <button
                    onClick={onDropdownToggle}
                    className="inline-flex items-center justify-between w-full sm:w-auto min-w-[200px] px-4 py-2 bg-white border border-purple-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                    <div className="flex items-center">
                        <Filter className="w-4 h-4 mr-2 text-purple-500" />
                        <span>
                            {selectedCategory === 'all'
                                ? 'All Categories'
                                : categories[selectedCategory] || 'Select Category'
                            }
                        </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full sm:w-56 bg-white border border-purple-200 rounded-lg shadow-lg">
                        <div className="py-1">
                            <button
                                onClick={() => onCategoryChange('all')}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 ${selectedCategory === 'all' ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                                    }`}
                            >
                                All Categories
                            </button>
                            {allCategories.map(category => (
                                <button
                                    key={category.categoryId}
                                    onClick={() => onCategoryChange(category.categoryId)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 ${selectedCategory === category.categoryId
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'text-gray-700'
                                        }`}
                                >
                                    {category.categoryTitle}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
