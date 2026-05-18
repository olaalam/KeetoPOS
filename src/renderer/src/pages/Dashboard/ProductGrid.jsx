import { Search } from 'lucide-react';

// 1. مصفوفة الداتا الوهمية (Mock Data) للتجربة وعرض المنتجات
const MOCK_PRODUCTS = [
    { id: 1, name: 'Strawberry Sundae Ice Cream', price: 45.00, category: 'Sundae', color: 'bg-pink-50 text-pink-500 border-pink-100' },
    { id: 2, name: 'Chocolate Chimney Cake', price: 65.00, category: 'Chimney', color: 'bg-amber-50 text-amber-700 border-amber-100' },
    { id: 3, name: 'Classic Waffle with Nutella', price: 55.00, category: 'new Items', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
    { id: 4, name: 'Ice Latte Caramel', price: 40.00, category: 'Favorite', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 5, name: 'Vanilla Ice Cream Scoop', price: 30.00, category: 'Ice-cream', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 6, name: 'Croissant Mix Cheese', price: 50.00, category: 'new breakfast', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
];

export default function ProductGrid({ products = [] }) {

    // إذا كانت الـ props فاضية، هنعرض الداتا الوهمية تلقائياً عشان نشوف التصميم
    const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;

    // في حالة لو مفيش منتجات خالص (الداتا الوهمية والحقيقية فاضية)
    if (displayProducts.length === 0) {
        return (
            <div className="flex-1 bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center p-8">
                <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center text-slate-350 shadow-inner">
                    <Search className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mt-4">No products found</h3>
                <p className="text-sm text-slate-400 mt-1">There are no products available in this category.</p>
            </div>
        );
    }

    return (
        // شبكة المنتجات: هتعرض 3 كروت في الصف الواحد على الشاشات العادية، وبتعمل سكرول لو المنتجات كترت
        <div className="flex-1 grid grid-cols-3 gap-4 overflow-y-auto pr-1 auto-rows-max">

            {displayProducts.map((product) => (
                <div
                    key={product.id}
                    className="bg-white border border-slate-200/60 rounded-2xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 cursor-pointer transition-all duration-200 group active:scale-[0.98]"
                >
                    {/* صورة افتراضية للمنتج (لحين رفع صور حقيقية) */}
                    <div className={`w-full h-28 rounded-xl border flex flex-col items-center justify-center font-bold text-xs gap-1 ${product.color}`}>
                        <span className="text-lg">🍦</span>
                        <span>{product.name.split(' ').slice(0, 2).join(' ')}</span>
                    </div>

                    {/* تفاصيل المنتج ( الاسم، التصنيف، السعر) */}
                    <div className="mt-3 flex flex-col flex-1 justify-between">
                        <h4 className="font-bold text-xs text-slate-700 group-hover:text-slate-900 transition-colors line-clamp-2 min-h-[32px]">
                            {product.name}
                        </h4>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                {product.category}
                            </span>
                            <span className="text-xs font-extrabold text-slate-800 font-mono">
                                {product.price.toFixed(2)} EGP
                            </span>
                        </div>
                    </div>

                </div>
            ))}

        </div>
    );
}