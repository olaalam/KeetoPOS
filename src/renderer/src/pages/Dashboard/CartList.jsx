export default function CartList({ cartItems = [] }) {
    return (
        <div className="flex-1 flex flex-col overflow-hidden p-4">
            {/* Table Header */}
            <div className="grid grid-cols-4 text-[10px] font-bold text-slate-400 uppercase border-b border-slate-100 pb-2 mb-3">
                <span className="col-span-2">Item</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Total</span>
            </div>

            {cartItems.length === 0 ? (
                /* Empty Cart State */
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                    <p className="text-sm font-bold text-slate-500">No items found for this order.</p>
                    <p className="text-xs text-slate-400 mt-1">Select items from the left grid to add them here.</p>
                </div>
            ) : (
                /* قائمة العناصر عند إضافتها مستقبلاً */
                <div className="flex-1 overflow-y-auto">
                    {/* Loop over cartItems here */}
                </div>
            )}
        </div>
    );
}