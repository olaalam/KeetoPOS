import { useState } from 'react';
import DiscountSection from '../Discount/DiscountSection';

export default function CartSummary({ 
    subTotal = 0, 
    taxRate = 14, // نسبة مئوية افتراضية مثلاً 14%
    serviceFee = 10, // قيمة ثابتة أو نسبة
    discount = 0, // قيمة الخصم المباشر
    notes = '',
    onNotesChange,
    onCheckout,
    onApplyDiscount, 
    onOpenAuthModal
}) {
    const [showDiscountPanel, setShowDiscountPanel] = useState(false);

    // الحسابات الماليّة
    const taxAmount = subTotal * (taxRate / 100);
    const finalTotal = Math.max(0, (subTotal + taxAmount + serviceFee) - discount);

    return (
        <div className="p-4 bg-white border-t border-slate-100 space-y-4 shadow-sm">
            
            {/* قسم تفاصيل الفاتورة */}
            <div className="space-y-2 text-sm border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between text-slate-500">
                    <span>Sub Total:</span>
                    <span className="font-bold text-slate-700 font-mono">{subTotal.toFixed(2)} EGP</span>
                </div>
                
                <div className="flex items-center justify-between text-slate-500">
                    <span>Tax ({taxRate}%):</span>
                    <span className="font-bold text-slate-700 font-mono">+{taxAmount.toFixed(2)} EGP</span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                    <span>Service Fees:</span>
                    <span className="font-bold text-slate-700 font-mono">+{serviceFee.toFixed(2)} EGP</span>
                </div>

                {discount > 0 && (
                    <div className="flex items-center justify-between text-green-600 font-medium">
                        <span>Discount:</span>
                        <span className="font-bold font-mono">-{discount.toFixed(2)} EGP</span>
                    </div>
                )}
            </div>

            {/* قسم ملاحظات الأوردر (Notes) */}
            <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block">Notes</label>
                <textarea
                    placeholder="Order Notes"
                    value={notes}
                    onChange={(e) => onNotesChange(e.target.value)}
                    className="w-full h-16 p-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:border-primary resize-none transition-all"
                />
            </div>

            {/* الإجمالي الكبير وزر الدفع والخصم */}
            <div className="space-y-3 pt-1">
                <div className="flex items-baseline justify-between">
                    <span className="text-sm font-black text-slate-800 uppercase">Amount To Pay:</span>
                    <span className="text-2xl font-black text-green-600 font-mono">
                        {finalTotal.toFixed(2)} EGP
                    </span>
                </div>

                <div className="flex gap-3">
                    {/* زر الخصم التفاعلي */}
                    <button 
                        type="button"
                        onClick={() => setShowDiscountPanel(!showDiscountPanel)}
                        className={`px-4 py-3 border-2 border-dashed font-black text-xs rounded-xl transition-all tracking-wider shrink-0 uppercase ${
                            showDiscountPanel 
                                ? 'border-blue-600 bg-blue-50 text-blue-600' 
                                : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                        }`}
                    >
                        Discount :
                    </button>

                    {/* زر الـ Checkout */}
                    <button
                        type="button"
                        onClick={onCheckout}
                        disabled={subTotal === 0}
                        className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm py-3 rounded-xl flex justify-between items-center px-5 transition-all active:scale-[0.98] shadow-md shadow-primary"
                    >
                        <span>CHECKOUT</span>
                        <span className="font-mono">{finalTotal.toFixed(2)} EGP</span>
                    </button>
                </div>
            </div>

            {/* 👇 استدعاء المكون المستقل هنا ليظهر أسفل الأزرار مباشرة عند الضغط على الزر */}
            {showDiscountPanel && (
                <DiscountSection 
                    onApplyDiscount={onApplyDiscount}
                    onOpenAuthModal={onOpenAuthModal}
                />
            )}

        </div>
    );
}