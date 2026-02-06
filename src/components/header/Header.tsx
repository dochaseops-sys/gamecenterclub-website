import { Search, Gamepad2, Menu, Tag } from "lucide-react";
import { useAppSelector, type RootState } from "../../services/redux/store";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSearchGamesQuery } from "../../services/redux/apis/games";
import type { Game } from "../../types/games.types";

interface Props {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: Props) {
    const user = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch search results only when query has 2+ characters
    const shouldFetch = debouncedQuery.trim().length >= 2;
    const { data: searchResponse, isLoading } = useSearchGamesQuery({ query: debouncedQuery }, {
        skip: !shouldFetch,
    });
    const searchResults: Game[] = searchResponse?.data || [];

    // Show dropdown when there are results or loading
    useEffect(() => {
        setShowDropdown(shouldFetch && (searchResults.length > 0 || isLoading));
    }, [shouldFetch, searchResults, isLoading]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleGameClick = (gameId: number) => {
        navigate(`/game/${gameId}`);
        setSearchQuery("");
        setShowDropdown(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-6">
            <div className="h-full flex items-center justify-between">

                {/* Mobile: Hamburger Menu */}
                <button
                    className="p-2 mr-2 rounded-lg hover:bg-white/5 lg:hidden"
                    onClick={onMenuClick}
                    aria-label="Toggle Menu"
                >
                    <Menu className="w-6 h-6 text-foreground" />
                </button>

                {/* Desktop: Logo and Toggle Icon */}
                <div className="hidden lg:flex items-center gap-3">
                    <button
                        className="p-2 -ml-2 rounded-lg hover:bg-white/5 transition-transform active:scale-95"
                        onClick={onMenuClick}
                        title="Toggle Sidebar"
                    >
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                            <Gamepad2 className="w-6 h-6 text-[var(--secondary)]" />
                        </div>
                    </button>
                    <span className="font-display font-bold text-xl text-foreground tracking-widest cursor-default">
                        Game Center Club
                    </span>
                </div>

                {/* Center: Search (hidden on mobile) */}
                <div ref={searchRef} className="hidden md:flex flex-1 max-w-lg relative mx-6">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search games..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => shouldFetch && setShowDropdown(true)}
                        className="w-full pl-10 pr-3 py-2 text-sm rounded-3xl border border-border bg-gray/50 text-foreground placeholder-muted-foreground outline-none shadow-inner transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 bg-slate-700"
                    />

                    {/* Search Dropdown */}
                    {showDropdown && (
                        <div className="absolute top-full mt-2 left-0 right-0 bg-[#0f0f12] border border-white/10 rounded-xl shadow-2xl max-h-[480px] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            {isLoading ? (
                                <div className="p-12 text-center">
                                    <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.3)]"></div>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <div className="p-4 flex items-center gap-3 border-b border-white/5 bg-white/2">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Tag className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                                                Search Results
                                                <span className="text-secondary text-sm font-medium bg-secondary/10 px-2 py-0.5 rounded-full">
                                                    {searchResults.length}
                                                </span>
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Results List */}
                                    <div className="overflow-y-auto py-2 custom-scrollbar max-h-[350px]">
                                        {searchResults.map((game: Game) => (
                                            <button
                                                key={game.id}
                                                onClick={() => handleGameClick(game.id)}
                                                className="w-full px-4 py-3 flex items-center gap-4 hover:bg-white/5 transition-all group border-l-2 border-transparent hover:border-primary"
                                            >
                                                <div className="relative flex-shrink-0">
                                                    <img
                                                        src={game.thumbnail}
                                                        alt={game.name}
                                                        className="w-14 h-14 rounded-lg object-cover shadow-lg border border-white/5 group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    {game.status === 'featured' && (
                                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full border-2 border-[#0f0f12]"></div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col text-left">
                                                    <span className="text-sm text-foreground font-semibold group-hover:text-primary transition-colors">
                                                        {game.name}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                                        {(game.categories && game.categories.length > 0)
                                                            ? game.categories[0].title
                                                            : (game.category?.title || 'Game')} • {game.mobileSupport ? 'Mobile' : 'Desktop'}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="p-3 border-t border-white/5 bg-white/2">
                                        <button
                                            onClick={() => {
                                                navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                                                setShowDropdown(false);
                                            }}
                                            className="w-full text-center text-sm font-bold text-muted-foreground hover:text-foreground transition-colors py-1"
                                        >
                                            Select All
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Search className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm text-foreground font-medium">No games found</p>
                                    <p className="text-xs text-muted-foreground mt-1">Try searching for something else</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">

                    {/* Notifications */}
                    {/* <button className="relative hidden sm:flex p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-white/5 transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full shadow-[0_0_8px_#bc13fe]" />
                    </button> */}

                    {/* User / Auth */}
                    {user.id ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-xs font-bold text-foreground">{user.name}</span>
                                <span className="text-[10px] text-muted-foreground">Online</span>
                            </div>
                            <img
                                src={`${user.profile_pic}`}
                                alt="User avatar"
                                className="w-9 h-9 rounded-full border border-white/10 hover:border-primary/50 transition-colors "
                            />
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-3">
                            {/* <Link to="/login">
                                <button className="bg-secondary px-4 py-1.5 rounded-lg text-sm font-bold text-primary hover:bg-secondary/90 transition-all shadow-[0_0_15px_rgba(188,19,254,0.2)]">
                                    Log In
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="text-sm font-medium hover:text-foreground transition-colors">
                                    Sign Up
                                </button>
                            </Link> */}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}