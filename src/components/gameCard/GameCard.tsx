import { Play, Star, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
    id: number;
    title: string;
    thumbnail?: string;
    plays?: string;
    rating?: number;
    showDetails?: boolean;
    mobileSupport?: boolean;
}

export default function GameCard({ id, title, thumbnail, plays, rating, showDetails = true, mobileSupport }: Props) {
    return (
        <Link to={`/game/${id}`} className='shadow-[0_0_8px_var(--border)]'>
            <div
                className={
                    "group relative rounded-xl overflow-hidden bg-border border border-border cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]"}
            >
                {/* Image Container */}
                <div className={
                    "w-full overflow-hidden relative aspect-square"}>
                    {mobileSupport && (
                        <div className="absolute top-0 right-0 pointer-events-none z-10 overflow-hidden w-16 h-16">
                            <div className="absolute top-3 -right-8 w-28 bg-secondary py-1 text-center text-[10px] font-bold text-black rotate-45 shadow-md">
                                MOBILE
                            </div>
                        </div>
                    )}
                    <img
                        src={thumbnail || `https://picsum.photos/200?${title}`}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-[0_0_5px_#00f3ff]">
                            <Play className="w-5 h-5 text-black fill-black ml-1" />
                        </div>
                    </div>

                    {/* Rating Overlay */}
                    {showDetails && rating ? <div className="absolute p-2 inset-0 flex items-start justify-end">
                        <div className="py-1 px-2 text-xxs font-extrabold rounded-md bg-black/70 flex items-center justify-center">
                            <Star size={10} fill='gold' color='gold' className='mr-1' /> <span>{rating}</span>
                        </div>
                    </div> : <div className="absolute p-2 inset-0 flex items-end">
                        <p className='text-xs font-bold'>{title}</p>
                    </div>}
                </div>

                {/* Content */}
                {showDetails && <div className="p-3 relative">
                    {/* Neon line decoration */}
                    <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-full transition-all duration-500" />

                    <h3 className="font-display font-bold text-sm text-foreground truncate transition-colors">
                        {title}
                    </h3>

                    <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground text-gray-light transition-colors">
                            Action
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-gray-light text-muted-foreground transition-colors">
                            <Users2 size={14} /> {plays || 0}
                        </span>
                    </div>
                </div>}
            </div>
        </Link>
    );
}
