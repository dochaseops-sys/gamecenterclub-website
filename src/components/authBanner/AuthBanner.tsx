import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../services/redux/store";

const AuthBanner = () => {
    const user = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // If user is already logged in, don't show the banner
        if (user.id) {
            setIsVisible(false);
            return;
        }

        // Initially show after a small delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [user.id]);

    const handleClose = () => {
        setIsVisible(false);
        // Show again after 60 seconds as per the plan
        setTimeout(() => {
            if (!user.id) {
                setIsVisible(true);
            }
        }, 60000);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    if (!isVisible || user.id) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl animate-in slide-in-from-bottom-5 duration-500">
            <div className="bg-[#5831C3] p-4 md:p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-2xl border border-white/10 gap-4 md:gap-0">
                <div className="flex-1 px-0 md:px-4 text-center md:text-left">
                    <p className="text-white font-bold text-sm md:text-base">
                        Don't lose your progress!
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end">
                    <button
                        onClick={handleClose}
                        className="flex-1 md:flex-none px-5 py-2 text-white font-bold text-sm rounded-full border border-white/30 hover:bg-white/10 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleLogin}
                        className="flex-1 md:flex-none px-6 py-2 bg-white text-[#5831C3] font-bold text-sm rounded-full hover:bg-gray-100 transition-colors"
                    >
                        Log in
                    </button>                                                  
                </div>
            </div>
        </div>
    );
};

export default AuthBanner;
