import { Gamepad2, X } from 'lucide-react'

import { useSignupMutation } from '../../services/redux/apis/auth'
import Loader from '../../loader/Loader'
import { useSignupForm, type SignupFormValues } from './signup.schema';
import Modal from '../../components/modal/Modal';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setItemToStorage } from '../../utils/localstorage.utils';
import { getApiErrorMessage } from '../../utils/errors.utils';
import { useAppDispatch } from '../../services/redux/store';
import { login } from '../../services/redux/slices/auth.slice';
import { onGoogleLogin } from '../../utils/googleAuth.utils';
import TextInput from '../../components/TextInput/TextInput';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const [signup, { isLoading, isError, error: apiError }] = useSignupMutation();
    const [modalOpen, setModalOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>("")

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useSignupForm();

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiErrorMessage(apiError);
            setErrorMessage(errorMessage);
            setModalOpen(true)
        }
    }, [isError])

    const onSubmit = async (data: SignupFormValues) => {
        const response = await signup({
            name: data.name,
            email: data.email,
            password: data.password,
        }).unwrap();
        setItemToStorage("user", response)
        dispatch(login(response))
        setModalOpen(true)
    }

    const onModalClose = () => {
        setModalOpen(false)
        isValid && !isError && navigate('/')
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
                    <h2 className='text-lg'>{errorMessage || "Account Created Successfully!"}</h2>
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
                <div className="space-y-4">
                    <button className="w-full h-12 bg-white text-primary hover:bg-gray-200 font-bold transition-all group" onClick={onGoogleLogin}>
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </span>
                    </button>

                    <div className="py-4 relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                        <div className="flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or continue with email</span></div>
                    </div>

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
                            Sign Up
                        </button>
                    </form>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account? <Link to="/login" className="text-secondary hover:underline font-bold">Log In</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
