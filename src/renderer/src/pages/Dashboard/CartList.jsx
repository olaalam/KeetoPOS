import { Trash2 } from 'lucide-react';

export default function CartList({ cartItems = [], onRemoveItem, onClearCart, onOpenProductModal }) {
    return (
        <div className="flex-1 flex flex-col overflow-hidden p-4">

            {/* Table Header & Void Button */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
                {/* تقسيم الهيدر ليتطابق مع عواميد المنتجات بالظبط */}
                <div className="flex-1 grid grid-cols-5 text-[10px] font-bold text-slate-400 uppercase">
                    <span className="col-span-2">Item</span>
                    <span className="text-center">Price</span>
                    <span className="text-right col-span-2 pr-8">Total</span> {/* مساحة إضافية عشان الحذف */}
                </div>

                {/* زرار حذف كل السلة */}
                <button
                    onClick={onClearCart}
                    className="flex items-center gap-1 text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors shrink-0"
                >
                    <span>Void</span>
                    <Trash2 className="h-3.5 w-3.5" />
                </button>
            </div>

            {cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                    <p className="text-sm font-bold text-slate-500">No items found for this order.</p>
                    <p className="text-xs text-slate-400 mt-1">Select items from the left grid to add them here.</p>
                </div>
            ) : (
                /* قائمة العناصر بعد إضافتها */
                <div className="flex-1 overflow-y-auto space-y-1">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            // تقسيم الصف لـ 5 أعمدة عشان زرار القمامة ياخد عمود منفصل ومريح
                            className="grid grid-cols-5 gap-2 py-2 items-center border-b border-slate-50 hover:bg-slate-50/80 transition-colors group rounded-lg px-1"
                        >
                            {/* 1. الصورة والاسم (واخد عمودين) */}
                            <div className="col-span-2 flex items-center gap-2 min-w-0">
                                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                                    {item.qty}x
                                </span>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation(); // يمنع تكرار الـ click على الـ div الخارجي
                                        onOpenProductModal && onOpenProductModal(item); // 👈 تعديل: تم تغيير product إلى item
                                    }}
                                    className="text-xs font-bold text-slate-700 truncate leading-tight cursor-pointer hover:text-primary transition-colors"
                                >
                                    {item.name}
                                </span>
                            </div>

                            {/* 2. الكمية (عمود واحد) */}
                            <div className="flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                                    {item.price}
                                </span>

                            </div>

                            {/* 3. الإجمالي الفرعي (عمود واحد) */}
                            <div className="flex items-center justify-end font-mono text-xs font-extrabold text-slate-800">
                                {(item.price * item.qty).toFixed(2)}
                            </div>

                            {/* 4. زرار حذف المنتج المنفرد (عمود واحد) */}
                            <div className="flex items-center justify-end">
                                <button
                                    // مررنا الـ id والـ name مع بعض
                                    onClick={() => onRemoveItem && onRemoveItem(item.id, item.name)}
                                    className="text-slate-300 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-all "
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}