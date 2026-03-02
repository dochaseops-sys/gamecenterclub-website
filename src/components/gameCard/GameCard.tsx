import { Star, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
    id: number;
    title: string;
    thumbnail?: string;
    gif?: string;
    plays?: string;
    category?: string;
    rating?: number;
    showDetails?: boolean;
    mobileSupport?: boolean;
    multiplayer?: boolean;
    categories?: any;
}

export default function GameCard({ id, title, thumbnail, gif, plays, rating, showDetails = true, mobileSupport, multiplayer, categories }: Props) {
    return (
        <Link to={`/game/${id}`} className='shadow-[0_0_8px_var(--border)]'>
            <div
                className={
                    "group/card relative rounded-xl overflow-hidden bg-border border border-border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] aspect-square"}
            >
                {/* Image Container (Background) */}
                <div className="absolute inset-0 w-full h-full">
                    {/* Static Thumbnail */}
                    <img
                        src={thumbnail || `https://picsum.photos/200?${title}`}
                        alt={title}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover/card:scale-110 ${gif ? 'group-hover/card:opacity-0' : 'opacity-100'}`}
                    />

                    {/* GIF Preview (Visible on Hover) */}
                    {gif && (
                        <img
                            src={gif}
                            alt={`${title} preview`}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 scale-110"
                        />
                    )}
                </div>

                {/* Overlay Gradient (Ensures text readability) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-300 z-10" />

                {/* Tags (Mobile/Multiplayer) */}
                {mobileSupport && (
                    <div className="absolute top-0 right-0 pointer-events-none z-20 overflow-hidden w-16 h-16 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-3 -right-8 w-28 bg-secondary py-1 text-center text-[10px] font-bold text-black rotate-45 shadow-md uppercase">
                            MOBILE
                        </div>
                    </div>
                )}
                {multiplayer && (
                    <div className="absolute top-0 left-0 pointer-events-none z-20 overflow-hidden w-16 h-16 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-3 -left-8 w-28 bg-secondary py-1 text-center text-[8px] font-bold text-black -rotate-45 shadow-md uppercase">
                            MULTIPLAYER
                        </div>
                    </div>
                )}

                {/* Content Overlay */}
                <div className={`absolute bottom-0 left-0 right-0 p-3 z-20 transform transition-transform duration-300 ${showDetails ? 'translate-y-6 group-hover/card:-translate-y-1' : 'group-hover/card:-translate-y-1'}`}>
                    <h3 className="font-display font-bold text-sm text-white truncate drop-shadow-lg">
                        {title}
                    </h3>

                    {showDetails && (
                        <div className="flex items-center justify-between mt-1 opacity-0 group-hover/card:opacity-100 transition-all duration-300 delay-75">
                            <span className="text-[10px] text-gray-300 font-medium truncate max-w-[70%]">
                                {categories?.map((category: any) => category.title).join(", ")}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-secondary whitespace-nowrap">
                                <Users2 size={12} /> {plays || 0}
                            </span>
                        </div>
                    )}
                </div>

                {/* Rating Overlay */}
                {showDetails && rating && (
                    <div className="absolute p-2 inset-0 flex items-start justify-end z-20">
                        <div className="py-1 px-2 text-[10px] font-extrabold rounded-md bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white">
                            <Star size={10} fill='gold' color='gold' className='mr-1' /> <span>{rating}</span>
                        </div>
                    </div>
                )}

                {/* Neon line decoration */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary z-30 group-hover/card:w-full transition-all duration-500" />
            </div>
        </Link>
    );
}
