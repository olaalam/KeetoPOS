import { X, Printer, Check, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ReceiptModal({ isOpen, onClose, cartItems, paymentDetails }) {
    const [printStatus, setPrintStatus] = useState('idle'); // idle | printing | success | error

    // طباعة صامتة تلقائية لما الريسيت يفتح
    useEffect(() => {
        if (!isOpen) return;
        // طباعة تلقائية عند الفتح
        handleSilentPrint();

        // الاستماع لنتيجة الطباعة
        const cleanup = window.api?.onPrintDone?.((result) => {
            setPrintStatus(result.success ? 'success' : 'error');
        });

        return () => {
            cleanup?.();
            setPrintStatus('idle');
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSilentPrint = () => {
        setPrintStatus('printing');
        if (window.api?.printReceipt) {
            window.api.printReceipt(); // طباعة صامتة بدون نافذة
        } else {
            // fallback لو مش في Electron
            window.print();
            setPrintStatus('success');
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:bg-white print:p-0">
            {/* الشاشة البيضاء الخاصة بالريسيت (عرض 80mm للطباعة الحرارية) */}
            <div className="bg-white w-[320px] max-h-[90vh] overflow-y-auto shadow-2xl relative print:w-full print:max-h-none print:shadow-none font-mono text-sm">

                {/* زرار الإغلاق والطباعة (لن يظهروا في الطباعة) */}
                <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-slate-100 p-2 flex justify-between items-center print:hidden z-10">
                    <button
                        onClick={handleSilentPrint}
                        disabled={printStatus === 'printing'}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            printStatus === 'success' ? 'bg-green-100 text-green-700' :
                            printStatus === 'error' ? 'bg-red-100 text-red-700' :
                            printStatus === 'printing' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                    >
                        {printStatus === 'printing' && <Loader2 className="h-4 w-4 animate-spin" />}
                        {printStatus === 'success' && <Check className="h-4 w-4" />}
                        {printStatus === 'error' && <X className="h-4 w-4" />}
                        {(printStatus === 'idle') && <Printer className="h-4 w-4" />}
                        {printStatus === 'printing' ? 'Printing...' : printStatus === 'success' ? 'Printed!' : printStatus === 'error' ? 'Retry' : 'Print'}
                    </button>
                    <button onClick={onClose} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* محتوى الريسيت الفعلي */}
                <div className="p-6 text-center text-black">
                    <h2 className="text-xl font-black mb-1">FOOD 2 GO</h2>
                    <p className="text-xs mb-4">Alexandria, Egypt</p>

                    <div className="text-xs text-left mb-4 space-y-1">
                        <p>Date: {new Date().toLocaleString()}</p>
                        <p>Order No: #{Math.floor(Math.random() * 100000)}</p>
                        <p>Cashier: Main User</p>
                    </div>

                    <div className="border-t border-b border-dashed border-slate-300 py-3 mb-4">
                        <div className="flex justify-between text-xs font-bold mb-2">
                            <span>Item</span>
                            <span>Total</span>
                        </div>

                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between text-xs mb-1 text-left">
                                <div className="flex-1 pr-2">
                                    <span className="font-bold">{item.qty}x</span> {item.name}
                                </div>
                                <span>{(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="text-sm font-black flex justify-between mb-2">
                        <span>TOTAL</span>
                        <span>{paymentDetails?.total?.toFixed(2)} EGP</span>
                    </div>

                    <div className="text-xs flex justify-between text-slate-600 mb-1">
                        <span className="capitalize">Paid via {paymentDetails?.method?.replace('_', ' ')}</span>
                        <span>{Number(paymentDetails?.paidAmount || paymentDetails?.total).toFixed(2)} EGP</span>
                    </div>

                    {/* لو دفع مبلغ أكبر، بنحسب الباقي */}
                    {(Number(paymentDetails?.paidAmount) > paymentDetails?.total) && (
                        <div className="text-xs flex justify-between text-slate-600 mb-4 font-bold">
                            <span>Change</span>
                            <span>{(Number(paymentDetails?.paidAmount) - paymentDetails?.total).toFixed(2)} EGP</span>
                        </div>
                    )}

                    <div className="mt-8 text-xs font-bold">
                        <p>Thank you for your visit!</p>
                        <p className="font-normal mt-1 text-[10px]">Powered by Keeto POS</p>
                    </div>
                </div>
            </div>
        </div>
    );
}