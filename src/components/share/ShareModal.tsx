import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    gameName: string;
    gameUrl: string;
}

const ShareModal = ({ isOpen, onClose, gameName, gameUrl }: Props) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(gameUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gameUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${gameName} on GamingCenter!`)}&url=${encodeURIComponent(gameUrl)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${gameName} on GamingCenter! ${gameUrl}`)}`,
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#1e1e2d] w-full max-w-sm rounded-[32px] p-8 relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-white text-3xl font-bold text-center mb-8">
                    Share this game
                </h2>

                <div className="flex justify-center gap-6 mb-10">
                    {/* Facebook */}
                    <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>

                    {/* X (Twitter) */}
                    <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href={shareLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.552 0 11.888-5.337 11.891-11.893a11.83 11.83 0 00-3.486-8.412z" />
                        </svg>
                    </a>
                </div>

                <div className="bg-[#13131f] rounded-2xl border border-white/10 p-2 flex items-center">
                    <div className="flex-1 overflow-hidden px-4">
                        <p className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                            {gameUrl}
                        </p>
                    </div>
                    <button
                        onClick={handleCopy}
                        className={`${copied ? 'bg-green-600' : 'bg-[#5831C3]'} text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 hover:opacity-90 active:scale-95`}
                    >
                        {copied ? (
                            <>
                                <Check size={16} />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy size={16} />
                                Copy
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
