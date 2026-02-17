import { Gamepad2, X, Eye, EyeOff, Check } from 'lucide-react'

import { useSignupMutation, useVerifyEmailMutation, useResendOtpMutation } from '../../services/redux/apis/auth'
import Loader from '../../loader/Loader'
import { useSignupForm, type SignupFormValues } from './signup.schema';
import Modal from '../../components/modal/Modal';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setItemToStorage, removeItem } from '../../utils/localstorage.utils';
import { getApiErrorMessage } from '../../utils/errors.utils';
import { useAppDispatch } from '../../services/redux/store';
import { login, logout } from '../../services/redux/slices/auth.slice';
import TextInput from '../../components/TextInput/TextInput';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const [signup, { isLoading: isSignupLoading, isError: isSignupError, error: signupError }] = useSignupMutation();
    const [verifyEmail, { isLoading: isVerifyLoading, isError: isVerifyError, error: verifyError }] = useVerifyEmailMutation();
    const [resendOtp, { isLoading: isResendLoading, isError: isResendError, error: resendError }] = useResendOtpMutation();

    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>("")
    const [step, setStep] = useState<'signup' | 'otp'>('signup');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');


    const [isVerified, setIsVerified] = useState(false);

    // 👇 Added password toggle states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        dispatch(logout());
        removeItem("user");
    }, [dispatch]);

    useEffect(() => {
        if (isSignupLoading || isVerifyLoading || isResendLoading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [isSignupLoading, isVerifyLoading, isResendLoading])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useSignupForm();

    useEffect(() => {
        if (isSignupError) {
            const errorMessage = getApiErrorMessage(signupError);
            setErrorMessage(errorMessage);
            setModalOpen(true)
        }
        if (isVerifyError) {
            const errorMessage = getApiErrorMessage(verifyError);
            setErrorMessage(errorMessage);
            setModalOpen(true)
        }
        if (isResendError) {
            const errorMessage = getApiErrorMessage(resendError);
            setErrorMessage(errorMessage);
            setModalOpen(true)
        }
    }, [isSignupError, isVerifyError, isResendError, signupError, verifyError, resendError])

    const onSubmit = async (data: SignupFormValues) => {
        await signup({
            name: data.name,
            email: data.email,
            password: data.password,
        }).unwrap();
        setEmail(data.email);
        setStep('otp');
    }

    const onVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await verifyEmail({ email, otp }).unwrap();
            setItemToStorage("user", response);
            dispatch(login(response));
            setIsVerified(true);
            setModalOpen(true);
            setErrorMessage(null);
        } catch (error) { console.error("OTP Verification Error:", error) }
    }

    const onModalClose = () => {
        setModalOpen(false)
        if (!errorMessage && step === 'otp' && isVerified) {
            navigate('/')
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="flex-col p-8 z-10 min-h-screen w-full flex items-center justify-center bg-background py-12">
            <Modal
                isOpen={modalOpen}
                onClose={onModalClose}
                Icon={
                    errorMessage ? (
                        <div className="p-4 mb-5 bg-gray rounded-full">
                            <X className='text-custom-red' strokeWidth={4} />
                        </div>
                    ) : (
                        <div className="p-4 mb-5 bg-gray rounded-full">
                            <Check className='text-secondary' strokeWidth={4} />
                        </div>
                    )
                }
            >
                <div className="mb-5">
                    <h2 className='text-lg'>
                        {errorMessage || (
                            step === 'otp'
                                ? (isVerified ? "Account Verified Successfully!" : "OTP Sent Successfully!")
                                : "Check your email for the OTP!"
                        )}
                    </h2>
                </div>
            </Modal>
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-card border border-secondary rounded-2xl mb-6 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                    <Gamepad2 className="w-8 h-8 text-secondary" />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">SIGN UP</h1>
                <p className="text-muted-foreground">Create your account</p>
            </div>

            {/* Card */}
            <div className="border lg:w-1/3 md:w-1/2 border-border p-8 rounded-2xl shadow-sm shadow-gray">
                {step === 'signup' ? (
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>

                        <TextInput
                            register={register}
                            name={'name'}
                            placeholder='Enter your name'
                            error={errors.name}
                        />

                        <TextInput
                            register={register}
                            name={'email'}
                            placeholder='Enter Email'
                            error={errors.email}
                        />

                        {/* Password Field */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                placeholder="Enter Password"
                                className="w-full h-12 px-4 pr-12 bg-primary border border-white/10 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none text-white placeholder-muted-foreground"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

                        {/* Confirm Password Field */}
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                placeholder="Confirm Password"
                                className="w-full h-12 px-4 pr-12 bg-primary border border-white/10 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none text-white placeholder-muted-foreground"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}

                        <button className="w-full h-12 bg-secondary hover:bg-secondary/50 text-black font-bold uppercase tracking-wider">
                            Sign Up
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <p className="text-center text-muted-foreground">
                            We've sent an OTP to {email}. Please enter it below.
                        </p>

                        <form onSubmit={onVerifyOtp}>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                maxLength={4}
                                className="w-full h-12 px-4 bg-primary border border-white/10 rounded-lg text-center text-lg tracking-[1em]"
                            />
                            <button className="w-full mt-4 h-12 bg-secondary text-black font-bold">
                                Verify OTP
                            </button>
                            <div className="pt-2 text-center">
                                <button
                                    type="button"
                                    className="text-secondary hover:underline text-sm font-bold"
                                    onClick={async () => {
                                        try {
                                            await resendOtp({ email }).unwrap();
                                            setErrorMessage(null);
                                            setModalOpen(true);
                                        } catch (error) {
                                            // Handle error if needed
                                        }
                                    }}
                                >
                                    Resend OTP
                                </button>
                            </div>
                            <button
                                type="button"
                                className="w-full text-secondary hover:underline text-sm"
                                onClick={() => setStep('signup')}
                            >
                                Back to Signup
                            </button>
                        </form>
                    </div>
                )}

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account? <Link to="/login" className="text-secondary hover:underline font-bold">Log In</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
