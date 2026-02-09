import { Gamepad2, X } from 'lucide-react'

import Loader from '../../loader/Loader'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import OTPInput from '../../components/otpInput/OTPInput';
import Modal from '../../components/modal/Modal';
import { useEffect, useState } from 'react';
import { useVerifyPasswordResetOtpMutation } from '../../services/redux/apis/auth';
import { getApiErrorMessage } from '../../utils/errors.utils';
import { useOTPVerificationForm } from './OTpVerification.schema';
import { Controller } from 'react-hook-form';


const OTPVerification = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [verifyResetOtp, { isError, isLoading, error: apiError }] = useVerifyPasswordResetOtpMutation()
    const [modalOpen, setModalOpen] = useState(false)

    const [errorMessage, setErrorMessage] = useState<string | null>("");
    const [resetToken, setResetToken] = useState("");

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useOTPVerificationForm();

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiErrorMessage(apiError);
            setErrorMessage(errorMessage);
            setModalOpen(true)
        }
    }, [isError])

    const onSubmit = async (data: { otp: string }) => {
        const email = state.email;
        const response = await verifyResetOtp({ otp: data.otp, email }).unwrap();
        setResetToken(response.token);
        setModalOpen(true)
    }

    const onModalClose = () => {
        setModalOpen(false)
        isValid && !isError && navigate('/reset-password', {
            state: {
                token: resetToken,
            }
        })
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="flex-col p-8 z-10 min-h-screen w-full flex items-center justify-center bg-background py-12">
            <Modal isOpen={modalOpen} onClose={onModalClose} Icon={isError ? <div className="p-4 mb-5 bg-gray rounded-full">
                <X className='text-custom-red' strokeWidth={4} />
            </div> : null}>
                <div className="mb-5">
                    <h2 className='text-lg'>{errorMessage || "Email Verified!"}</h2>
                </div>
            </Modal>

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-card border border-secondary rounded-2xl mb-6 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                    <Gamepad2 className="w-8 h-8 text-secondary" />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">VERIFY OTP</h1>
                <p className="text-muted-foreground">Type OTP to reset password.</p>
            </div>

            {/* Card */}
            <div className="border lg:w-1/3 md:w-1/2 border-border p-8 rounded-2xl shadow-sm shadow-gray">
                <div className="space-y-4">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="space-y-2">
                            <Controller
                                name='otp'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => <OTPInput length={4} {...field} />}
                            />
                            {errors.otp && <p className='text-custom-red text-xs'>{errors.otp.message}</p>}
                        </div>
                        <button className="w-full h-12 bg-secondary hover:bg-secondary/50 text-black font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.3)]" type='submit'>
                            Continue
                        </button>
                    </form>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <Link to="/login" className="text-secondary hover:underline font-bold">Back to Login</Link>
                </div>
            </div>
        </div>
    )
}

export default OTPVerification
