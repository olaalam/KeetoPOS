export default function CartSummary({ total = 0 }) {
    return (
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">Sub Total</span>
                <span className="text-lg font-extrabold text-red-600 font-mono">
                    {total.toFixed(2)} EGP
                </span>
            </div>

            <button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold rounded-xl shadow-lg shadow-primary/10 transition-all active:scale-[0.98]">
                PAY NOW
            </button>
        </div>
    );
}