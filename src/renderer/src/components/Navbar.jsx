import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, ShoppingBag, Bike, UtensilsCrossed, Globe,
    DollarSign, MoreHorizontal, Clock, Bell, User, ChevronDown,
    History, AlertCircle, ClipboardList, FileText, LogOut, Menu, X,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import logo from '@/assets/logo.webp';

export default function Navbar() {
    const navigate = useNavigate();
    const setLogout = useAuthStore((state) => state.setLogout);
    const user = useAuthStore((state) => state.user);

    const [activeTab, setActiveTab] = useState('Take Away');
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [timeString, setTimeString] = useState('00:00:00');

    const moreMenuRef = useRef(null);
    const userMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        let totalSeconds = 0;
        const updateTime = () => {
            totalSeconds += 1;
            const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
            const seconds = String(totalSeconds % 60).padStart(2, '0');
            setTimeString(`${hours}:${minutes}:${seconds}`);
        };
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) setShowMoreMenu(false);
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) setShowUserMenu(false);
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) setShowMobileMenu(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => { setLogout(); toast.info('Logged out successfully.'); navigate('/login'); };
    const handleCloseShift = () => { toast.success('Shift closed successfully.'); navigate('/login'); };

    const tabs = [
        { id: 'Take Away', icon: <ShoppingBag className="h-5 w-5" /> },
        { id: 'Delivery', icon: <Bike className="h-5 w-5" /> },
        { id: 'Dine In', icon: <UtensilsCrossed className="h-5 w-5" /> },
        { id: 'Online', icon: <Globe className="h-5 w-5" /> },
        { id: 'Expenses', icon: <DollarSign className="h-5 w-5" /> },
    ];

    const tabClass = (id) =>
        `flex flex-col items-center justify-center min-w-[80px] h-[72px] rounded-xl border transition-all active:scale-[0.98] ${activeTab === id
            ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
            : 'border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800'}`;

    return (
        <nav className="w-full bg-white border-b border-slate-200/80 shadow-sm relative select-none z-40">
            {/* Main Bar */}
            <div className="h-16 lg:h-20 px-4 lg:px-6 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-2 lg:gap-3">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="h-10 w-10 lg:h-[72px] lg:w-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:border-primary active:scale-95 transition-all text-slate-400 hover:text-slate-600"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>

                    {/* Desktop Tabs */}
                    <div className="hidden lg:flex items-center gap-3">
                        {tabs.map((tab) => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={tabClass(tab.id)}>
                                {tab.icon}
                                <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider">{tab.id}</span>
                            </button>
                        ))}

                        {/* More Dropdown (desktop) */}
                        <div className="relative" ref={moreMenuRef}>
                            <button
                                onClick={() => setShowMoreMenu(!showMoreMenu)}
                                className={`flex flex-col items-center justify-center min-w-[80px] h-[72px] rounded-xl border transition-all active:scale-[0.98] ${showMoreMenu ? 'border-primary bg-slate-50 text-slate-800' : 'border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800'}`}
                            >
                                <MoreHorizontal className="h-5 w-5" />
                                <span className="text-[10px] font-bold mt-1.5 uppercase tracking-wider flex items-center gap-0.5">
                                    More <ChevronDown className="h-3 w-3" />
                                </span>
                            </button>
                            {showMoreMenu && <MoreDropdown onClose={() => setShowMoreMenu(false)} />}
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="lg:hidden h-10 w-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:border-primary transition-all text-slate-500"
                    >
                        {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>

                    {/* Active tab badge on mobile */}
                    <span className="lg:hidden text-xs font-bold text-black bg-primary border border-primary/90 px-3 py-1 rounded-lg">
                        {activeTab}
                    </span>
                </div>

                {/* CENTER: Logo */}
                <div className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    <img src={logo} alt="logo" className="h-14 w-14 lg:h-20 lg:w-20" />
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2 lg:gap-3">
                    {/* Timer */}
                    <div className="hidden sm:flex flex-col items-center justify-center min-w-[80px] lg:min-w-[90px] h-10 lg:h-[72px] rounded-xl border border-slate-200 bg-slate-50/50 px-2">
                        <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-primary animate-pulse" />
                        <span className="text-[11px] font-extrabold text-primary mt-1 font-mono tracking-wider">{timeString}</span>
                    </div>

                    {/* Notifications */}
                    <button className="flex flex-col items-center justify-center w-10 h-10 lg:min-w-[76px] lg:h-[72px] rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800 transition-all active:scale-[0.98]">
                        <div className="relative">
                            <Bell className="h-5 w-5 text-slate-600" />
                            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary/50" />
                        </div>
                        <span className="hidden lg:block text-[10px] font-bold mt-1.5 uppercase tracking-wider text-slate-400">New</span>
                    </button>

                    {/* User Menu */}
                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className={`flex flex-col items-center justify-center w-10 h-10 lg:min-w-[76px] lg:h-[72px] rounded-xl border transition-all active:scale-[0.98] ${showUserMenu ? 'border-primary bg-slate-50 text-slate-800' : 'border-slate-200 bg-white text-slate-500 hover:border-primary hover:text-slate-800'}`}
                        >
                            <User className="h-5 w-5 text-slate-600" />
                            <span className="hidden lg:block text-[10px] font-bold mt-1.5 uppercase tracking-wider text-slate-400">User</span>
                        </button>
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                                <div className="px-4 py-2 border-b border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Account</p>
                                    <p className="text-sm font-extrabold text-slate-800 truncate mt-0.5">{user?.username || 'Ola'}</p>
                                </div>
                                <button onClick={() => { setShowUserMenu(false); toast.info('Opening Profile'); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left mt-1">
                                    <User className="h-4 w-4 text-slate-400" /><span>Profile</span>
                                </button>
                                <button onClick={() => { setShowUserMenu(false); toast.info('Language toggled'); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left">
                                    <Globe className="h-4 w-4 text-slate-400" /><span>العربية</span>
                                </button>
                                <div className="border-t border-slate-100 my-1" />
                                <button onClick={() => { setShowUserMenu(false); handleCloseShift(); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 text-sm font-bold text-primary transition-colors text-left">
                                    <Clock className="h-4 w-4 text-primary/50" /><span>Close Shift</span>
                                </button>
                                <button onClick={() => { setShowUserMenu(false); handleLogout(); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 text-sm font-bold text-primary transition-colors text-left">
                                    <LogOut className="h-4 w-4 text-primary/50" /><span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {showMobileMenu && (
                <div ref={mobileMenuRef} className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Timer on mobile */}
                    <div className="flex items-center gap-2 mb-3 sm:hidden">
                        <Clock className="h-4 w-4 text-primary animate-pulse" />
                        <span className="text-sm font-extrabold text-primary font-mono">{timeString}</span>
                    </div>

                    {/* Tabs Grid */}
                    <div className="grid grid-cols-3 gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setShowMobileMenu(false); }}
                                className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border font-bold text-xs transition-all active:scale-[0.97] ${activeTab === tab.id
                                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                                    : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-primary'}`}
                            >
                                {tab.icon}
                                <span className="uppercase tracking-wider text-[10px]">{tab.id}</span>
                            </button>
                        ))}

                        {/* More items inline on mobile */}
                        {[
                            { id: 'All Orders', icon: <History className="h-5 w-5" /> },
                            { id: 'Due', icon: <AlertCircle className="h-5 w-5" /> },
                            { id: 'Tables', icon: <UtensilsCrossed className="h-5 w-5" /> },
                            { id: 'Delivery Rpt', icon: <FileText className="h-5 w-5" /> },
                            { id: 'Dine In Rpt', icon: <ClipboardList className="h-5 w-5" /> },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { setShowMobileMenu(false); toast.info(`Navigating to ${item.id}`); }}
                                className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:border-primary font-bold text-xs transition-all active:scale-[0.97]"
                            >
                                {item.icon}
                                <span className="uppercase tracking-wider text-[10px] text-center leading-tight">{item.id}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

// Reusable More Dropdown for desktop
function MoreDropdown({ onClose }) {
    const items = [
        { label: 'All Orders', icon: <History className="h-4 w-4 text-slate-400" />, msg: 'Navigating to All Orders' },
        { label: 'Due', icon: <AlertCircle className="h-4 w-4 text-slate-400" />, msg: 'Navigating to Due' },
        { label: 'Expenses', icon: <DollarSign className="h-4 w-4 text-slate-400" />, msg: 'Navigating to Expenses' },
        { label: 'Tables', icon: <UtensilsCrossed className="h-4 w-4 text-slate-400" />, msg: 'Navigating to Tables' },
    ];
    const reports = [
        { label: 'Delivery Order', icon: <FileText className="h-4 w-4 text-slate-400" />, msg: 'Generating Delivery Report' },
        { label: 'Dine In Order', icon: <ClipboardList className="h-4 w-4 text-slate-400" />, msg: 'Generating Dine In Report' },
    ];
    return (
        <div className="absolute left-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
            {items.map((item) => (
                <button key={item.label} onClick={() => { onClose(); toast.info(item.msg); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left">
                    {item.icon}<span>{item.label}</span>
                </button>
            ))}
            <div className="border-t border-slate-100 my-1" />
            <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reports</div>
            {reports.map((item) => (
                <button key={item.label} onClick={() => { onClose(); toast.info(item.msg); }} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors text-left">
                    {item.icon}<span>{item.label}</span>
                </button>
            ))}
        </div>
    );
}
