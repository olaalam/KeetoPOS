import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, User, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ShiftPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // استقبال اسم الكاشير المختار من الصفحة السابقة
    const cashierName = location.state?.cashierName || 'Ola';

    // 1. حالة الوردية: (في الحقيقة هتيجي من الـ API أو الـ Store)
    // سنفترض هنا أنها false (مغلقة) وتحتاج لفتح، أو true (مفتوحة بالفعل)
    const [isShiftOpen, setIsShiftOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    // محاكاة لعمل API Call أول ما الصفحة تفتح عشان نعرف حالة الوردية الحالية للكاشير ده
    useEffect(() => {
        const checkShiftStatus = async () => {
            setIsLoading(true);
            // هنا هتعملي fetch للـ backend وتشيلي الـ setTimeout
            await new Promise((resolve) => setTimeout(resolve, 800));

            // مثال: هنخليها تقرأ عشوائي أو تقدري تربطيها بـ state حقيقية
            // setIsShiftOpen(true); // جربي تغيريها لـ true عشان تشوفي التصميم التاني
            setIsLoading(false);
        };

        checkShiftStatus();
    }, [cashierName]);

    // دالة التعامل مع زر "Take your shift" (فتح وردية جديدة)
    const handleOpenShift = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // هنا بتبعتي الـ startingAmount والـ account للـ API بتاعك
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsShiftOpen(true);
        setIsLoading(false);

        // التوجيه للـ Dashboard بعد الفتح بنجاح
        navigate('/dashboard');
    };

    // دالة التعامل مع زر "Back to Work" (الوردية مفتوحة بالفعل)
    const handleBackToWork = () => {
        // التوجيه مباشرة للـ Dashboard لأن الوردية مفتوحة
        navigate('/dashboard');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
                <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-6">

            {/* الترحيب بالكاشير */}
            <h1 className="text-2xl font-semibold mb-6 tracking-wide">
                Welcome back, <span className="text-red-700 font-bold">{cashierName}</span>
            </h1>

            {isShiftOpen ? (
                /* ----- الكارد الأول: الوردية مفتوحة بالفعل (Already on Shift / Go to Home) ----- */
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 w-full max-w-md text-center space-y-6 animate-in fade-in duration-200">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Shift Status</h2>
                        <p className="text-sm text-slate-400 mt-1">You're currently on shift</p>
                    </div>

                    {/* أيقونة المستخدم المركزية */}
                    <div className="flex justify-center">
                        <div className="h-20 w-20 rounded-full bg-black flex items-center justify-center text-white shadow-sm">
                            <User className="h-10 w-10" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleBackToWork}
                            className="w-full h-11 bg-slate-700 hover:bg-slate-800 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                        >
                            <span>Back to Work</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>

                        {/* علامة الحماية الخضراء الناجحة */}
                        <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-medium text-sm pt-2">
                            <CheckCircle2 className="h-4 w-4 fill-emerald-50 text-emerald-600" />
                            <span>Shift is open.</span>
                        </div>
                    </div>
                </div>
            ) : (
                /* ----- الكارد الثاني: الوردية مغلقة وتحتاج لفتح (Open Shift / Take your shift) ----- */
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 w-full max-w-md text-center space-y-6 animate-in fade-in duration-200">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Shift Status</h2>
                        <p className="text-sm text-slate-400 mt-1">You're up for your shift</p>
                    </div>

                    {/* أيقونة المستخدم المركزية بلون باهت */}
                    <div className="flex justify-center">
                        <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shadow-sm border border-slate-200">
                            <User className="h-10 w-10" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button
                            onClick={handleOpenShift}
                            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-md shadow-primary/10"
                        >
                            <span>Open Shift</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>

                        <p className="text-xs text-slate-400 pt-2">
                            Click to initialize and open your daily shift.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
