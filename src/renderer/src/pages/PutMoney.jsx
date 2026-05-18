import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function PutMoney() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cashierName = location.state?.cashierName || 'Ola';

    const handleTakeShift = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            navigate('/open-shift');
        }, 2000);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-100 text-slate-900 p-6">
            {/* الترحيب بالاسم المختار ديناميكياً */}
            <h1 className="text-2xl font-semibold mb-6">
                Welcome back, <span className="text-primary font-bold">{cashierName}</span>
            </h1>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md text-center space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">Shift Status</h2>
                    <p className="text-sm text-slate-500 mt-1">You're up for your shift</p>
                </div>

                <form onSubmit={handleTakeShift} className="space-y-4 text-left">
                    <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Select Financial Account</label>
                        <select className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>cash - tttt</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">Enter Starting Amount</label>
                        <Input
                            type="number"
                            placeholder="0.00"
                            className="h-10 border-slate-300"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center justify-center gap-2 mt-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            'Take your shift'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}