import { Heart, Sparkles, Percent, Layers } from 'lucide-react';

export default function CategorySidebar({ activeCategory, setActiveCategory }) {
    const categories = [
        { id: 'Favorite', name: 'Favorite', icon: <Heart className="h-4 w-4 text-red-500 fill-red-500" /> },
        { id: 'new Items', name: 'New Items', icon: <Sparkles className="h-4 w-4 text-amber-500" /> },
        { id: 'new breakfast', name: 'New Breakfast', icon: <Percent className="h-4 w-4 text-indigo-500" /> },
        { id: 'Sundae', name: 'Sundae', icon: <Layers className="h-4 w-4 text-pink-500" /> },
    ];

    return (
        <div className="w-48 flex flex-col gap-2 overflow-y-auto pr-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-1">Categories</p>

            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border font-bold text-sm transition-all text-left ${activeCategory === category.id
                            ? 'bg-white border-primary text-slate-800 shadow-sm'
                            : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/65'
                        }`}
                >
                    {category.icon}
                    <span>{category.name}</span>
                </button>
            ))}
        </div>
    );
}