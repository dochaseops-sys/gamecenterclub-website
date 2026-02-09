import { Gamepad2, X } from 'lucide-react'

import { useLoginMutation } from '../../services/redux/apis/auth'
import Loader from '../../loader/Loader'
import { useLoginForm, type LoginFormValues } from './login.schema';
import { useEffect, useState } from 'react'
import Modal from '../../components/modal/Modal';
import { getApiErrorMessage } from '../../utils/errors.utils';
import { setItemToStorage } from '../../utils/localstorage.utils';
import { useAppDispatch } from '../../services/redux/store';
import { login as loginAction } from '../../services/redux/slices/auth.slice';
import { Link, useNavigate } from 'react-router-dom';
import { onGoogleLogin } from '../../utils/googleAuth.utils';
import TextInput from '../../components/TextInput/TextInput';
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {
    const [login, { isLoading, isError, error: apiError }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>("")
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useLoginForm();

    useEffect(() => {
        if (isError) {
            const errorMessage = getApiErrorMessage(apiError);
            setErrorMessage(errorMessage);
            setModalOpen(true)
        } else {
            setErrorMessage("")
        }
    }, [isError])

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await login(data).unwrap();
            setItemToStorage("user", response)
            dispatch(loginAction(response))
            setModalOpen(true)
        } catch (error: any) {
            const message = getApiErrorMessage(error);
            if (message === "Please verify your email before logging in. You can request a new OTP if needed.") {
                navigate('/verify-account', { state: { email: data.email } });
            }
        }
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
                    <h2 className='text-lg'>{errorMessage || "Logged In Successfully!"}</h2>
                </div>
            </Modal>
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-card border border-secondary rounded-2xl mb-6 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                    <Gamepad2 className="w-8 h-8 text-secondary" />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-wide">WELCOME BACK</h1>
                <p className="text-muted-foreground">Enter the nexus of gaming.</p>
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
                            name={'email'}
                            placeholder='Email Address'
                            error={errors.email}
                        />
                        <div className="relative">
                            <TextInput
                                register={register}
                                name={'password'}
                                placeholder='Enter Password'
                                error={errors.password}
                                type={showPassword ? 'text' : 'password'}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                            </button>
                        </div>
                        <Link className='text-secondary text-xs' to='/forgot-password'>Forgot Password ?</Link>
                        <button className="w-full h-12 bg-secondary hover:bg-secondary/50 text-black font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.3)]" type='submit'>
                            Log In
                        </button>
                    </form>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Don't have an account? <Link to="/signup" className="text-secondary hover:underline font-bold">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
