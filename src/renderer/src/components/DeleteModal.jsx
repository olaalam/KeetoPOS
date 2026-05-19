export default function DeleteModal({ isOpen, onClose, onConfirm, itemName, isAll = false }) {
    // لو المودال مش مفتوح مش هيعرض حاجة
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            {/* كارت المودال */}
            <div className="bg-white rounded-3xl p-6 w-[340px] shadow-2xl border border-slate-100 transform scale-100 transition-all text-center">

                {/* أيقونة تحذير دائرية */}
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto text-xl mb-4">
                    ⚠️
                </div>

                {/* نص التنبيه */}
                <h3 className="text-base font-bold text-slate-800">
                    {isAll ? 'Clear Current Order?' : 'Remove Item?'}
                </h3>

                <p className="text-xs text-slate-400 mt-2 px-2 leading-relaxed">
                    {isAll
                        ? 'Are you sure you want to delete all items from this order? This action cannot be undone.'
                        : `Are you sure you want to remove "${itemName}" from the order?`
                    }
                </p>

                {/* أزرار التحكم */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                    {/* زرار التراجع */}
                    <button
                        onClick={onClose}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors active:scale-[0.98]"
                    >
                        Cancel
                    </button>

                    {/* زرار التأكيد الأحمر */}
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors shadow-sm shadow-red-200 active:scale-[0.98]"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}