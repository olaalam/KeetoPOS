export default function ActionGrid() {
    const actions = [
        { label: 'POINTS', className: 'bg-emerald-600 hover:bg-emerald-700' },
        { label: 'APPLY DEAL', className: 'bg-orange-600 hover:bg-orange-700' },
        { label: 'VIEW ORDERS', className: 'bg-slate-600 hover:bg-slate-700' },
        { label: 'PENDING ORDERS', className: 'bg-amber-500 hover:bg-amber-600' },
        { label: 'SAVE AS PENDING', className: 'bg-orange-500 hover:bg-orange-600' },
        { label: 'DINE IN', className: 'bg-indigo-600 hover:bg-indigo-700' },
    ];

    return (
        <div className="p-4 border-b border-slate-100">
            <div className="grid grid-cols-2 gap-2">
                {actions.map((action) => (
                    <button
                        key={action.label}
                        className={`h-[44px] rounded-xl text-white font-bold text-xs shadow-sm transition-all active:scale-[0.98] ${action.className}`}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
}