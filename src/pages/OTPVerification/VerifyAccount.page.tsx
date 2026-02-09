import { Gamepad2, X } from 'lucide-react'
import { useVerifyEmailMutation, useResendOtpMutation } from '../../services/redux/apis/auth'
import Loader from '../../loader/Loader'
import Modal from '../../components/modal/Modal';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setItemToStorage } from '../../utils/localstorage.utils';
import { getApiErrorMessage } from '../../utils/errors.utils';
import { useAppDispatch } from '../../services/redux/store';
import { login } from '../../services/redux/slices/auth.slice';

const VerifyAccount = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dispatch = useAppDispatch();

    const [verifyEmail, { isLoading: isVerifyLoading, isError: isVerifyError, error: verifyError }] = useVerifyEmailMutation();
    const [resendOtp, { isLoading: isResendLoading, isError: isResendError, error: resendError }] = useResendOtpMutation();

    const [modalOpen, setModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>("")
    const [successMessage, setSuccessMessage] = useState<string | null>("")
    const [otp, setOtp] = useState('');

    const email = state?.email;

    useEffect(() => {
        if (!email) {
            navigate('/login');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (isVerifyError) {
            setErrorMessage(getApiErrorMessage(verifyError));
            setSuccessMessage(null);
            setModalOpen(true);
        }
        if (isResendError) {
            setErrorMessage(getApiErrorMessage(resendError));
            setSuccessMessage(null);
            setModalOpen(true);
        }
    }, [isVerifyError, isResendError, verifyError, resendError]);

    const onVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await verifyEmail({ email, otp }).unwrap();
            setItemToStorage("user", response);
            dispatch(login(response));
            setErrorMessage(null);
            setSuccessMessage("Account Verified Successfully!");
            setModalOpen(true);
        } catch (error) {
            // Error handled by useEffect
        }
    }

    const onResendOtp = async () => {
        try {
            await resendOtp({ email }).unwrap();
            setErrorMessage(null);
            setSuccessMessage("OTP Resent Successfully! Please check your email.");
            setModalOpen(true);
        } catch (error) {
            // Error handled by useEffect
        }
    }

    const onModalClose = () => {
        setModalOpen(false)
        if (successMessage === "Account Verified Successfully!") {
            navigate('/')
        }
    }

    if (isVerifyLoading || isResendLoading) {
        return <Loader />
    }

    return (
        <div className="flex-col p-8 z-10 min-h-screen w-full flex items-center justify-center bg-background py-12">
            <Modal isOpen={modalOpen} onClose={onModalClose} Icon={(isVerifyError || isResendError) ? <div className="p-4 mb-5 bg-gray rounded-full">
                <X className='text-custom-red' strokeWidth={4} />
            </div> : null}>
                <div className="mb-5">
                    <h2 className='text-lg'>{errorMessage || successMessage}</h2>
                </div>
            </Modal>
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-card border border-secondary rounded-2xl mb-6 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                    <Gamepad2 className="w-8 h-8 text-secondary" />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">VERIFY ACCOUNT</h1>
                <p className="text-muted-foreground">Complete your registration</p>
            </div>

            <div className="border lg:w-1/3 md:w-1/2 border-border p-8 rounded-2xl shadow-sm shadow-gray">
                <div className="space-y-4">
                    <div className="py-4 relative">
                        <p className="text-center text-muted-foreground mb-4">
                            We've sent an OTP to {email}. Please enter it below to verify your account.
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={onVerifyOtp} noValidate>
                        <div className="space-y-2">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                maxLength={4}
                                className="w-full h-12 px-4 bg-primary border border-white/10 rounded-lg focus:ring-1 focus:ring-secondary focus:outline-none text-white placeholder-muted-foreground transition-all text-center tracking-[1em] text-lg"
                            />
                        </div>
                        <button className="w-full h-12 bg-secondary hover:bg-secondary/50 text-black font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.3)]" type='submit'>
                            Verify OTP
                        </button>
                    </form>

                    <div className="pt-4 text-center">
                        <button
                            type="button"
                            className="text-secondary hover:underline text-sm font-bold"
                            onClick={onResendOtp}
                        >
                            Resend OTP
                        </button>
                    </div>

                    <div className="mt-4 text-center text-sm text-muted-foreground border-t border-white/10 pt-4">
                        <Link to="/login" className="text-secondary hover:underline font-bold">Back to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount
