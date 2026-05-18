export default function CategorySidebar({ activeCategory, setActiveCategory, categories = [] }) {
    return (
        <div className="w-full md:w-48 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pr-2 pb-2 md:pb-0 scrollbar-hide">
            <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">Categories</p>

            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-auto md:w-full shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-xl border font-bold text-sm transition-all text-left ${
                        activeCategory === category.id
                            ? 'bg-white border-primary text-slate-800 shadow-sm'
                            : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/65'
                    }`}
                >
                    {category.icon}
                    <span className="whitespace-nowrap">{category.name}</span>
                </button>
            ))}
        </div>
    );
}