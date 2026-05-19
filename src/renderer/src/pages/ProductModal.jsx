import { X, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProductModal({ isOpen, onClose, product, onConfirm }) {
    // 1. States لإدارة الخيارات المحددة والكمية
    const [quantity, setQuantity] = useState(1);
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [selectedExtras, setSelectedExtras] = useState({}); // لتخزين الإضافات وكمياتها
    const [totalPrice, setTotalPrice] = useState(0);

    // داتا تجريبية للخيارات (ممكن تيجي من الـ product prop لاحقاً)
    const variations = [
        { id: 'v1', name: 'Crème Brulée', price: 15.00 },
        { id: 'v2', name: 'Tiramisu Crème', price: 20.00 },
        { id: 'v3', name: 'Lazy Cat Crème', price: 25.00 },
        { id: 'v4', name: 'Chocolate Crème', price: 10.00 },
    ];

    // حساب السعر الإجمالي عند كل تغيير
    useEffect(() => {
        if (!product) return;
        let extrasCost = 0;
        Object.values(selectedExtras).forEach(item => {
            extrasCost += (item.price * item.qty);
        });
        setTotalPrice((product.price + extrasCost) * quantity);
    }, [product, selectedExtras, quantity]);

    if (!isOpen || !product) return null;

    // دالة للتحكم في كمية الإضافات (Extras)
    const updateExtraQty = (extra, change) => {
        setSelectedExtras(prev => {
            const currentQty = prev[extra.id]?.qty || 0;
            const newQty = Math.max(0, currentQty + change);

            if (newQty === 0) {
                const newState = { ...prev };
                delete newState[extra.id];
                return newState;
            }

            return {
                ...prev,
                [extra.id]: { ...extra, qty: newQty }
            };
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800">{product.name}</h2>
                        <p className="text-slate-400 text-sm mt-1">No description available</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xl font-black text-red-600 font-mono">
                            {product.price.toFixed(2)} EGP
                        </span>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X className="h-6 w-6 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Body (Scrollable Content) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Section: Variations / Crème */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                Crème <span className="text-[10px] text-slate-400 font-normal">(Min: 1, Max: 4)</span>
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {variations.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                    <div className="flex items-center gap-3">
                                        {item.price > 0 && (
                                            <span className="text-xs font-bold text-slate-400">+ {item.price.toFixed(2)}</span>
                                        )}
                                        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                                            <button
                                                onClick={() => updateExtraQty(item, -1)}
                                                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="w-4 text-center text-xs font-black text-slate-700">
                                                {selectedExtras[item.id]?.qty || 0}
                                            </span>
                                            <button
                                                onClick={() => updateExtraQty(item, 1)}
                                                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section: Special Instructions */}
                    <section>
                        <h3 className="font-bold text-slate-800 mb-3">Special Instructions (Optional)</h3>
                        <textarea
                            placeholder="Add any special instructions for this item..."
                            value={specialInstructions}
                            onChange={(e) => setSpecialInstructions(e.target.value)}
                            className="w-full h-24 p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none"
                        />
                        <p className="text-[10px] text-right text-slate-400 mt-1">{specialInstructions.length}/200 characters</p>
                    </section>
                </div>

                {/* Footer (Actions) */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-1.5 px-3">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="text-red-600 p-1 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-lg font-black text-slate-800 min-w-[20px] text-center">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="text-red-600 p-1 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Total & Add Button */}
                    <button
                        onClick={() => onConfirm({
                            ...product,
                            qty: quantity,
                            totalPrice: totalPrice,
                            instructions: specialInstructions,
                            extras: selectedExtras
                        })}
                        className="flex-1 ml-6 bg-red-800 hover:bg-red-900 text-white rounded-xl py-3.5 px-6 flex items-center justify-between transition-all active:scale-[0.98] shadow-lg shadow-red-200"
                    >
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[10px] uppercase font-bold opacity-80">Total</span>
                            <span className="text-lg font-black font-mono">{totalPrice.toFixed(2)} EGP</span>
                        </div>
                        <span className="font-bold text-sm">Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}