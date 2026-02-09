import { Gamepad2, X } from 'lucide-react'

import Loader from '../../loader/Loader'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Modal from '../../components/modal/Modal'
import { useEffect, useState } from 'react'
import { useResetPasswordMutation } from '../../services/redux/apis/auth'
import { useResetPasswordForm, type ResetPasswordValues } from './resetPassword.schema'
import { getApiErrorMessage } from '../../utils/errors.utils'
import TextInput from '../../components/TextInput/TextInput'


const ResetPassword = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    const [modalOpen, setModalOpen] = useState(false)
    const [resetPassword, { isError, isLoading, error: apiError }] = useResetPasswordMutation()
    const [errorMessage, setErrorMessage] = useState<string | null>("");

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useResetPasswordForm({
        token: state?.token || "",
    });

    useEffect(() => {
        console.log("ResetPassword Page State:", state);
        console.log("Form Errors:", errors);
        console.log("Form is valid:", isValid);

        if (isError) {
            const errorMessage = getApiErrorMessage(apiError);
            setErrorMessage(errorMessage);
            setModalOpen(true)
        }
    }, [errors, isValid, state, isError, apiError]);

    const onSubmit = async (data: ResetPasswordValues) => {
        console.log("onSubmit triggered with data:", data);
        try {
            await resetPassword(data).unwrap();
            setModalOpen(true)
        } catch (err) {
            console.error("API Call Error:", err);
        }
    }

    const onModalClose = () => {
        setModalOpen(false)
        isValid && !isError && navigate('/login')
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
                    <h2 className='text-lg'>{errorMessage || "Password Reset Successfull!"}</h2>
                </div>
            </Modal>
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-card border border-secondary rounded-2xl mb-6 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                    <Gamepad2 className="w-8 h-8 text-secondary" />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">RESET PASSWORD</h1>
                <p className="text-muted-foreground">Choose a strong Password.</p>
            </div>

            {/* Card */}
            <div className="border lg:w-1/3 md:w-1/2 border-border p-8 rounded-2xl shadow-sm shadow-gray">
                <div className="space-y-4">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <input type="hidden" {...register('token')} />

                        {(errors.token) && (
                            <div className="p-3 bg-custom-red/10 border border-custom-red/20 rounded-lg">
                                <p className="text-custom-red text-xs font-bold uppercase mb-1">Validation Errors:</p>
                                {errors.token && <p className="text-custom-red text-xs">• Token: {errors.token.message}</p>}
                            </div>
                        )}

                        <TextInput
                            register={register}
                            name={'password'}
                            placeholder='Enter Password'
                            error={errors.password}
                        />
                        <TextInput
                            register={register}
                            name={'confirmPassword'}
                            placeholder='Confirm Password'
                            error={errors.confirmPassword}
                        />
                        <button className="w-full h-12 bg-secondary hover:bg-secondary/50 text-black font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.3)]" type='submit'>
                            Reset password
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

export default ResetPassword
