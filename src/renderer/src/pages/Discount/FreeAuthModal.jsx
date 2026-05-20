import { useState } from 'react';

export default function FreeAuthModal({ isOpen, onClose, onConfirm }) {
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-150">
                <h3 className="text-lg font-black text-primary">FreeDiscountAuthorization</h3>
                <p className="text-xs text-slate-500 font-medium">EnterPasswordToApplyFreeDiscount</p>
                
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 text-center border border-slate-200 rounded-xl focus:outline-none focus:border-primary font-mono tracking-widest text-sm"
                />

                <div className="flex gap-3 pt-2">
                    <button
                        onClick={() => {
                            setPassword('');
                            onClose();
                        }}
                        className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm(password);
                            setPassword('');
                        }}
                        className="flex-1 py-2.5 bg-primary hover:bg-primary/80 text-white font-bold text-xs rounded-xl transition-colors shadow-lg shadow-red-100"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}