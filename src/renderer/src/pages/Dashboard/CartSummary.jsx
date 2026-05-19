export default function CartSummary({ total = 0, onCheckout }) {
    return (
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">Sub Total</span>
                <span className="text-lg font-extrabold text-red-600 font-mono">
                    {total.toFixed(2)} EGP
                </span>
            </div>
            <button
                onClick={onCheckout}
                disabled={total === 0}
                className="mt-4 w-full bg-red-800 hover:bg-red-900 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm py-4 rounded-xl flex justify-between items-center px-6 transition-all active:scale-[0.98]"
            >
                <span>CHECKOUT</span>
                <span className="font-mono">{total.toFixed(2)} EGP</span>
            </button>
        </div>
    );
}