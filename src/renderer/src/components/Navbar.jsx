import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ShoppingBag,
    Bike,
    UtensilsCrossed,
    Globe,
    DollarSign,
    MoreHorizontal,
    Clock,
    Bell,
    User,
    ChevronDown,
    History,
    AlertCircle,
    ClipboardList,
    FileText,
    LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import logo from '@/assets/logo.webp';
export default function Navbar() {
    const navigate = useNavigate();
    const setLogout = useAuthStore((state) => state.setLogout);
    const user = useAuthStore((state) => state.user);

    // States
    const [activeTab, setActiveTab] = useState('Take Away');
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [timeString, setTimeString] = useState('00:00:00');

    // Refs for closing dropdowns on click outside
    const moreMenuRef = useRef(null);
    const userMenuRef = useRef(null);

    // 1. Live ticking clock (micro-animation)
    useEffect(() => {
        let totalSeconds = 0; // يبدأ العداد من صفر ثانية عند تحميل الصفحة

        const updateTime = () => {
            totalSeconds += 1; // زيادة ثانية كل لفة

            // حساب الساعات والدقائق والثواني من إجمالي الثواني
            const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
            const seconds = String(totalSeconds % 60).padStart(2, '0');

            setTimeString(`${hours}:${minutes}:${seconds}`);
        };

        // تشغيل العداد كل ثانية (1000 مللي ثانية)
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    // 2. Click outside logic
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
                setShowMoreMenu(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setLogout();
        toast.info('Logged out successfully.');
        navigate('/login');
    };

    const handleCloseShift = () => {
        toast.success('Shift closed successfully.');
        navigate('/login');
    };

    return (
        <nav className="h-20 w-full bg-white border-b border-slate-200/80 shadow-sm px-6 flex items-center justify-between text-slate-800 relative select-none">

            {/* LEFT: Action Buttons & Navigation */}
            <div className="flex items-center gap-3">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="h-[72px] w-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:border-primary active:scale-95 transition-all text-slate-400 hover:text-slate-600"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>

                {/* Tab - Take Away */}
                <button
                    onClick={() => setActiveTab('Take Away')}
                    className={`flex flex-col items-center justify-center min-w-[80px] h-[72px] rounded-xl border transition-all active:scale-[0.98] ${activeTab === 'Take Away'
                        ? 'bg-[#800F17] border-[#800F17] text-white shadow-md shadow-red-950/20'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800'
                        }`}
                >
                    <ShoppingBag className="h-5 w-5" />
                    <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider">Take Away</span>
                </button>

                {/* Tab - Delivery */}
                <button
                    onClick={() => setActiveTab('Delivery')}
                    className={`flex flex-col items-center justify-center min-w-[80px] h-[72px] rounded-xl border transition-all active:scale-[0.98] ${activeTab === 'Delivery'
                        ? 'bg-[#800F17] border-[#800F17] text-white shadow-md shadow-red-950/20'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800'
                        }`}
                >
                    <Bike className="h-5 w-5" />
                    <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider">Delivery</span>
                </button>

                {/* Tab - Dine In */}
                <button
                    onClick={() => setActiveTab('Dine In')}
                    className={`flex flex-col items-center justify-center min-w-[80px] h-[72px] rounded-xl border transition-all active:scale-[0.98] ${activeTab === 'Dine In'
                        ? 'bg-[#800F17] border-[#800F17] text-white shadow-md shadow-red-950/20'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800'
                        }`}
                >
                    <UtensilsCrossed className="h-5 w-5" />
                    <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider">Dine In</span>
                </button>

                {/* Tab - Online Orders */}
                <button
                    onClick={() => setActiveTab('Online Orders')}
                    className={`flex flex-col items-center justify-center min-w-[80px] h-[72px] rounded-xl border transition-all active:scale-[0.98] ${activeTab === 'Online Orders'
                        ? 'bg-[#800F17] border-[#800F17] text-white shadow-md shadow-red-950/20'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800'
                        }`}
                >
                    <Globe className="h-5 w-5" />
                    <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider text-center line-clamp-1 leading-tight">Online</span>
                </button>

                {/* Tab - Expenses */}
                <button
                    onClick={() => setActiveTab('Expenses')}
                    className={`flex flex-col items-center justify-center min-w-[80px] h-[72px] rounded-xl border transition-all active:scale-[0.98] ${activeTab === 'Expenses'
                        ? 'bg-[#800F17] border-[#800F17] text-white shadow-md shadow-red-950/20'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800'
                        }`}
                >
                    <DollarSign className="h-5 w-5 text-emerald-500 group-hover:text-emerald-600" />
                    <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider">Expenses</span>
                </button>

                {/* Tab - More Dropdown */}
                <div className="relative" ref={moreMenuRef}>
                    <button
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                        className={`flex flex-col items-center justify-center min-w-[80px] h-[72px] rounded-xl border transition-all active:scale-[0.98] ${showMoreMenu
                            ? 'border-primary bg-slate-50 text-slate-800'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800'
                            }`}
                    >
                        <MoreHorizontal className="h-5 w-5" />
                        <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider flex items-center gap-0.5">
                            More <ChevronDown className="h-3 w-3" />
                        </span>
                    </button>

                    {/* More Menu Dropdown Overlay */}
                    {showMoreMenu && (
                        <div className="absolute left-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                            <button
                                onClick={() => { setShowMoreMenu(false); toast.info('Navigating to All Orders'); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left"
                            >
                                <History className="h-4 w-4 text-slate-400" />
                                <span>All Orders</span>
                            </button>
                            <button
                                onClick={() => { setShowMoreMenu(false); toast.info('Navigating to Due'); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left"
                            >
                                <AlertCircle className="h-4 w-4 text-slate-400" />
                                <span>Due</span>
                            </button>
                            <button
                                onClick={() => { setShowMoreMenu(false); toast.info('Navigating to Expenses'); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left"
                            >
                                <DollarSign className="h-4 w-4 text-slate-400" />
                                <span>Expenses</span>
                            </button>
                            <button
                                onClick={() => { setShowMoreMenu(false); toast.info('Navigating to Tables'); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left"
                            >
                                <UtensilsCrossed className="h-4 w-4 text-slate-400" />
                                <span>Tables</span>
                            </button>

                            <div className="border-t border-slate-100 my-1" />
                            <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reports</div>

                            <button
                                onClick={() => { setShowMoreMenu(false); toast.info('Generating Delivery Report'); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left"
                            >
                                <FileText className="h-4 w-4 text-slate-400" />
                                <span>Delivery Order</span>
                            </button>
                            <button
                                onClick={() => { setShowMoreMenu(false); toast.info('Generating Dine In Report'); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left"
                            >
                                <ClipboardList className="h-4 w-4 text-slate-400" />
                                <span>Dine In Order</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* CENTER: Brand Logo */}
            <div className="flex items-center gap-1">
                <img src={logo} alt="logo" className="h-20 w-20" />
            </div>

            {/* RIGHT: Shift Info, Notifications & User */}
            <div className="flex items-center gap-3">
                {/* Timer / Shift Card */}
                <div className="flex flex-col items-center justify-center min-w-[90px] h-[72px] rounded-xl border border-slate-200 bg-slate-50/50 p-2">
                    <Clock className="h-5 w-5 text-red-600 animate-pulse" />
                    <span className="text-[12px] font-extrabold text-red-600 mt-1.5 font-mono tracking-wider">{timeString}</span>
                </div>

                {/* Notifications */}
                <button className="flex flex-col items-center justify-center min-w-[76px] h-[72px] rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800 transition-all active:scale-[0.98]">
                    <div className="relative">
                        <Bell className="h-5 w-5 text-slate-600" />
                        <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                    </div>
                    <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider text-slate-400">New</span>
                </button>

                {/* User Account Menu */}
                <div className="relative" ref={userMenuRef}>
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className={`flex flex-col items-center justify-center min-w-[76px] h-[72px] rounded-xl border transition-all active:scale-[0.98] ${showUserMenu
                            ? 'border-primary bg-slate-50 text-slate-800'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800'
                            }`}
                    >
                        <User className="h-5 w-5 text-slate-600" />
                        <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider text-slate-400">User</span>
                    </button>

                    {/* User Dropdown Overlay */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                            <div className="px-4 py-2 border-b border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Account</p>
                                <p className="text-sm font-extrabold text-slate-800 truncate mt-0.5">{user?.username || 'Ola'}</p>
                            </div>

                            <button
                                onClick={() => { setShowUserMenu(false); toast.info('Opening Profile'); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left mt-1"
                            >
                                <User className="h-4 w-4 text-slate-400" />
                                <span>Profile</span>
                            </button>
                            <button
                                onClick={() => { setShowUserMenu(false); toast.info('Language toggled to Arabic'); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left"
                            >
                                <Globe className="h-4 w-4 text-slate-400" />
                                <span>العربية</span>
                            </button>

                            <div className="border-t border-slate-100 my-1" />

                            <button
                                onClick={() => { setShowUserMenu(false); handleCloseShift(); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 text-sm font-bold text-red-600 transition-colors text-left"
                            >
                                <Clock className="h-4 w-4 text-red-500" />
                                <span>Close Shift</span>
                            </button>
                            <button
                                onClick={() => { setShowUserMenu(false); handleLogout(); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 text-sm font-bold text-red-600 transition-colors text-left"
                            >
                                <LogOut className="h-4 w-4 text-red-500" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </nav>
    );
}
