import { useState } from 'react';
import { X, Banknote, CreditCard, Smartphone, Truck, Clock, ArrowRightLeft } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, totalAmount, onPay }) {
    const [selectedMethod, setSelectedMethod] = useState('cash');
    const [customerAmount, setCustomerAmount] = useState('');

    if (!isOpen) return null;

    const paymentMethods = [
        { id: 'cash', label: 'Cash', icon: Banknote },
        { id: 'visa', label: 'Visa', icon: CreditCard },
        { id: 'talabat_cash', label: 'Talabat Cash', icon: Banknote },
        { id: 'talabat_visa', label: 'Talabat Visa', icon: CreditCard },
        { id: 'instapay', label: 'Instapay', icon: Smartphone },
        { id: 'delivery', label: 'Delivery', icon: Truck },
        { id: 'due', label: 'Due', icon: Clock },
        { id: 'split', label: 'Split', icon: ArrowRightLeft },
    ];

    const handlePayment = () => {
        onPay({
            method: selectedMethod,
            paidAmount: customerAmount || totalAmount,
            total: totalAmount
        });
        setCustomerAmount(''); // تصفير الحقل للمرة القادمة
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-black text-slate-800">Checkout</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* شبكة طرق الدفع */}
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {paymentMethods.map((method) => {
                            const isSelected = selectedMethod === method.id;
                            const Icon = method.icon;
                            return (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedMethod(method.id)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${isSelected
                                            ? 'border-primary bg-primary/50 text-primary shadow-sm'
                                            : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon className={`h-6 w-6 mb-2 ${isSelected ? 'text-primary' : 'text-slate-400'}`} />
                                    <span className="text-[11px] font-bold text-center capitalize leading-tight">
                                        {method.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* حقل إدخال المبلغ المدفوع من العميل */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-2">Amount by Customer</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">EGP</span>
                            <input
                                type="number"
                                placeholder={totalAmount.toFixed(2)}
                                value={customerAmount}
                                onChange={(e) => setCustomerAmount(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-lg font-black focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 flex flex-col items-center gap-4 bg-slate-50/30">
                    <div className="text-3xl font-black text-primary font-mono">
                        {totalAmount.toFixed(2)} EGP
                    </div>

                    <button
                        onClick={handlePayment}
                        className="w-full bg-primary hover:bg-primary/80 text-white rounded-xl py-4 font-black text-lg transition-all active:scale-[0.98] shadow-lg shadow-primary"
                    >
                        PAY NOW
                    </button>
                </div>
            </div>
        </div>
    );
}