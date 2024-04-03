function Filters({ categories, handleSelectCategory, handleFiltersChange }: any) {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            <select
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400 mb-4"
                onChange={(e) => handleSelectCategory(e.target.value)}
            >
                <option value="">Select Availability</option>
                {categories.map((category: any) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Products to display</label>
                <input
                    type="number"
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                    onChange={(e) => handleFiltersChange('top', e.target.value)}
                    placeholder="1-100"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                <input
                    type="number"
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                    onChange={(e) => handleFiltersChange('minPrice', e.target.value)}
                    placeholder="1-10000"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <input
                    type="number"
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
                    onChange={(e) => handleFiltersChange('maxPrice', e.target.value)}
                    placeholder="1-10000"
                />
            </div>
        </div>
    );
}

export default Filters;
