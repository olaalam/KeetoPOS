import { useState } from 'react';

export default function DiscountSection({ 
    onApplyDiscount, 
    onOpenAuthModal 
}) {
    const [activeTab, setActiveTab] = useState('Select'); // Tabs: 'Select' | 'Free' | 'By Company'
    const [freeDiscountValue, setFreeDiscountValue] = useState('55');
    const [companyDiscountValue, setCompanyDiscountValue] = useState('55');
    const [selectedDropdownValue, setSelectedDropdownValue] = useState('NoDiscount');

    // قائمة الخصومات الجاهزة لتبويب Select
    const selectOptions = ['NoDiscount', '10% Off', '20% Off', 'Staff Discount'];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-4 animate-in fade-in duration-200">
            <h4 className="text-xs font-black text-slate-700 text-center uppercase tracking-wider">
                Discount Options
            </h4>

            {/* الأزرار الرئيسية للتبديل (Tabs) */}
            <div className="grid grid-cols-3 border border-slate-200 rounded-xl bg-white overflow-hidden p-0.5">
                <button
                    onClick={() => handleTabChange('Select')}
                    className={`py-2.5 text-xs font-bold transition-colors rounded-lg ${
                        activeTab === 'Select'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    Select
                </button>
                <button
                    onClick={() => handleTabChange('Free')}
                    className={`py-2.5 text-xs font-bold transition-colors rounded-lg ${
                        activeTab === 'Free'
                            ? 'bg-purple-600 text-white'
                            : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    Free
                </button>
                <button
                    onClick={() => handleTabChange('By Company')}
                    className={`py-2.5 text-xs font-bold transition-colors rounded-lg ${
                        activeTab === 'By Company'
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    By Company
                </button>
            </div>

            {/* عرض محتوى التبويب بناءً على الاختيار النشط */}
            <div className="pt-1">
                {activeTab === 'Select' && (
                    <div className="space-y-2">
                        <select
                            value={selectedDropdownValue}
                            onChange={(e) => {
                                setSelectedDropdownValue(e.target.value);
                                // هنا يتم تمرير القيمة المحددة للحسابات الكلية
                                if (e.target.value === 'NoDiscount') onApplyDiscount(0);
                                else if (e.target.value === '10% Off') onApplyDiscount(10); // مثال لقيمة ثابتة أو معالجة النسبة
                            }}
                            className="w-full p-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                        >
                            {selectOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                )}

                {activeTab === 'Free' && (
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={freeDiscountValue}
                            onChange={(e) => setFreeDiscountValue(e.target.value)}
                            className="flex-1 p-2 px-3 text-xs font-mono font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                        />
                        <button
                            onClick={() => onOpenAuthModal(parseFloat(freeDiscountValue) || 0)}
                            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl transition-colors"
                        >
                            Send
                        </button>
                    </div>
                )}

                {activeTab === 'By Company' && (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={companyDiscountValue}
                            onChange={(e) => setCompanyDiscountValue(e.target.value)}
                            className="flex-1 p-2 px-3 text-xs font-mono font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
                        />
                        <button
                            onClick={() => {
                                onApplyDiscount(parseFloat(companyDiscountValue) || 0);
                            }}
                            className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-black rounded-xl transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}