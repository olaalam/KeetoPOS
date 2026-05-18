import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, Lock, User, Eye, EyeOff, Terminal } from 'lucide-react';
import { loginSchema } from '@/schemas/auth-schema';
import { useAuthStore } from '@/store/auth-store';

// مكونات shadcn/ui
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const setLogin = useAuthStore((state) => state.setLogin);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (values) => {
        setIsSubmitting(true);

        // محاكاة تأخير السيرفر (ثانية ونصف)
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (values.username === 'admin' && values.password === '123456') {
            toast.success('✨ Welcome to Keeto Tech ✨');
            setLogin({ username: 'Keeto Tech', role: 'Admin' }, 'fake-jwt-token-xyz');
        } else {
            toast.error('Please enter valid username and password');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-slate-950 text-white font-sans overflow-hidden dark">

            {/* النصف الأول: لوحة الهوية الجمالية لـ Keeto Tech */}
            <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-slate-950 via-slate-950 to-black border-r border-slate-900">
                {/* خلفية شبكية تكنولوجية خفيفة */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

                {/* التوهج الخلفي المعتمد على الـ primary */}
                <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

                {/* الشعار بالأعلى متناسق مع الـ primary */}
                <div className="relative flex items-center gap-2.5 font-semibold text-lg tracking-wider text-primary">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                        <Terminal className="h-5 w-5" />
                    </div>
                    Keeto Tech
                </div>

                {/* النصوص في المنتصف */}
                <div className="relative z-10 max-w-md space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        The Next Generation Desktop POS Ecosystem.
                    </h1>
                    <p className="text-base text-slate-400 leading-relaxed">
                        Experience lightning-fast retail management, offline-first reliability, and seamless hardware communications built for modern businesses.
                    </p>
                </div>

                {/* الحقوق بالأسفل */}
                <div className="relative text-xs text-slate-500">
                    © 2026 Keeto Tech Inc. All rights reserved.
                </div>
            </div>

            {/* النصف الثاني: الـ Form ممتد بالكامل ومتمركز بشكل راقٍ */}
            <div className="relative flex items-center justify-center p-6 md:p-12 bg-slate-950">

                {/* توهج خلفي ناعم متناسق مع الـ primary في الشاشات الصغيرة باستخدام وميض Tailwind v4 */}
                <div className="absolute inset-0 lg:hidden bg-[radial-gradient(circle_at_center,theme(colors.primary/5%),transparent_50%)]" />

                <div className="w-full max-w-sm space-y-8 relative z-10">

                    {/* الرأس والترحيب */}
                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white">Account Login</h2>
                        <p className="text-sm text-slate-400">
                            Enter your credentials below to access your dashboard
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                            {/* حقل اسم المستخدم */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-slate-300 font-medium text-sm">Username</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                {/* الأيقونة تضيء بلون الـ primary عند الـ focus */}
                                                <User className="absolute left-3 top-3 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                                <Input
                                                    placeholder="Enter username"
                                                    {...field}
                                                    className="h-10 bg-slate-900/50 border-slate-800 pl-10 text-white placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-xs font-light" />
                                    </FormItem>
                                )}
                            />

                            {/* حقل كلمة المرور */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-slate-300 font-medium text-sm">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="••••••••"
                                                    {...field}
                                                    className="h-10 bg-slate-900/50 border-slate-800 px-10 text-white placeholder:text-slate-600 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-400 text-xs font-light" />
                                    </FormItem>
                                )}
                            />

                            {/* زر تسجيل الدخول الاحترافي باللون الـ primary بالكامل */}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-10 mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98] transition-all duration-200"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                                        <span>Authenticating...</span>
                                    </div>
                                ) : (
                                    'Sign In to Dashboard'
                                )}
                            </Button>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}