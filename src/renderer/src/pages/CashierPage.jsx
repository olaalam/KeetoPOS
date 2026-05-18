import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';

export default function CashierPage() {
    const navigate = useNavigate();

    const handleSelectCashier = (cashierName) => {
        navigate('/put-money', { state: { cashierName } });
    };

    return (
        <div className="p-8 bg-slate-950 min-h-screen text-white grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col  justify-center">
                <h1 className="text-2xl font-bold mb-6">Selection Cashier</h1>
                <div className="space-y-4">
                    {/* كارد الكاشير الأول */}
                    <button
                        onClick={() => handleSelectCashier('Smouha1POS')}
                        className="w-full max-w-md p-4 bg-slate-900 border border-slate-800 rounded-lg flex justify-between items-center hover:border-primary transition-all"
                    >
                        <span>Smouha1POS</span>
                        <div className="h-3 w-3 rounded-full bg-slate-700" />
                    </button>

                    {/* كارد الكاشير الثاني */}
                    <button
                        onClick={() => handleSelectCashier('Test pos')}
                        className="w-full max-w-md p-4 bg-slate-900 border border-slate-800 rounded-lg flex justify-between items-center hover:border-primary transition-all"
                    >
                        <span>Test pos</span>
                        <div className="h-3 w-3 rounded-full bg-slate-700" />
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <img src={logo} alt="logo" />
            </div>
        </div>
    );
}