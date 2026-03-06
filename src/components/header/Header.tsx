import { Search, Menu, Tag, User, ChevronLeft, Bell, RefreshCw, Download } from "lucide-react";
import { useAppSelector, type RootState } from "../../services/redux/store";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSearchGamesQuery } from "../../services/redux/apis/games";
import { useGetNotificationsQuery, useMarkNotificationReadMutation } from "../../services/redux/apis/auth";
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
    const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const mobileSearchRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    // PWA Install State
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isInstallable, setIsInstallable] = useState(false);

    // DB notifications via RTK Query (only when user is logged in)
    const { data: notifData, refetch } = useGetNotificationsQuery(
        { page: 1, limit: 30 },
        { skip: !user.id, pollingInterval: 60000 } // refresh every 60s
    );
    const [markRead] = useMarkNotificationReadMutation();

    const dbNotifications = notifData?.notifications || [];
    const unreadCount = notifData?.unreadCount ?? 0;


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const shouldFetch = debouncedQuery.trim().length >= 2;
    const { data: searchResponse, isLoading } = useSearchGamesQuery({ query: debouncedQuery }, {
        skip: !shouldFetch,
    });
    const searchResults: Game[] = searchResponse?.data || [];


    useEffect(() => {
        setShowDropdown(shouldFetch && (searchResults.length > 0 || isLoading));
    }, [shouldFetch, searchResults, isLoading]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isOutsideSearch = !searchRef.current || !searchRef.current.contains(event.target as Node);
            const isOutsideMobileSearch = !mobileSearchRef.current || !mobileSearchRef.current.contains(event.target as Node);
            const isOutsideNotifications = !notificationsRef.current || !notificationsRef.current.contains(event.target as Node);

            if (isOutsideSearch && isOutsideMobileSearch && isOutsideNotifications) {
                setShowDropdown(false);
                setShowNotifications(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: any) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Optionally, reset when installed
        window.addEventListener('appinstalled', () => {
            setDeferredPrompt(null);
            setIsInstallable(false);
            console.log('PWA was installed');
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setIsInstallable(false);
    };

    const handleGameClick = (gameId: number) => {
        navigate(`/game/${gameId}`);
        setSearchQuery("");
        setShowDropdown(false);
        setIsMobileSearchActive(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const renderSearchDropdown = () => {
        if (!showDropdown) return null;

        return (
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
                                    setIsMobileSearchActive(false);
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
        );
    };

    const renderNotificationsDropdown = () => {
        if (!showNotifications) return null;

        const formatTime = (dateStr: string) => {
            const diff = Date.now() - new Date(dateStr).getTime();
            const mins = Math.floor(diff / 60000);
            if (mins < 1) return 'Just now';
            if (mins < 60) return `${mins}m ago`;
            const hours = Math.floor(mins / 60);
            if (hours < 24) return `${hours}h ago`;
            return `${Math.floor(hours / 24)}d ago`;
        };

        const handleNotifClick = async (id: number, url?: string) => {
            await markRead(id);
            if (url) window.location.href = url;
            setShowNotifications(false);
        };

        const handleMarkAll = async () => {
            const unread = dbNotifications.filter(n => !n.is_read);
            await Promise.all(unread.map(n => markRead(n.id)));
        };

        return (
            <div className="absolute top-full mt-2 -right-12 sm:right-0 w-[280px] sm:w-80 border bg-slate-900 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl max-h-[480px] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-white/5 bg-white/2">
                    <h3 className="font-bold text-base text-foreground">Notifications</h3>
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <span className="text-secondary text-xs font-medium bg-secondary/10 px-2 py-0.5 rounded-full">
                                {unreadCount} New
                            </span>
                        )}
                        <button
                            onClick={() => refetch()}
                            className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded"
                            title="Refresh"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="overflow-y-auto py-2 custom-scrollbar max-h-[350px]">
                    {dbNotifications.length > 0 ? (
                        dbNotifications.map((notification) => (
                            <button
                                key={notification.id}
                                onClick={() => handleNotifClick(notification.id, notification.url)}
                                className={`w-full px-4 py-3 flex flex-col gap-1 hover:bg-white/5 transition-all text-left border-l-2 ${!notification.is_read ? 'border-secondary bg-secondary/5' : 'border-transparent'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-sm font-semibold ${!notification.is_read ? 'text-foreground' : 'text-muted-foreground'
                                        }`}>
                                        {notification.title}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">
                                        {formatTime(notification.sent_at)}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {notification.message}
                                </p>
                            </button>
                        ))
                    ) : (
                        <div className="p-8 text-center">
                            <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-40" />
                            <p className="text-sm text-muted-foreground">No notifications yet</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-white/5 bg-white/2 flex flex-col gap-2">
                    <button
                        onClick={() => {
                            navigate('/notifications');
                            setShowNotifications(false);
                        }}
                        className="w-full text-center text-sm font-bold text-secondary hover:text-secondary/80 transition-colors py-1"
                    >
                        See all notifications
                    </button>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAll}
                            className="w-full text-center text-[10px] uppercase tracking-wider font-bold text-muted-foreground hover:text-foreground transition-colors py-0.5"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-6">
            <div className="h-full flex items-center justify-between">

                {/* Mobile Search View */}
                {isMobileSearchActive ? (
                    <div ref={mobileSearchRef} className="flex-1 flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                        <button
                            onClick={() => setIsMobileSearchActive(false)}
                            className="p-2 -ml-2 rounded-lg hover:bg-white/5"
                            aria-label="Back"
                        >
                            <ChevronLeft className="w-6 h-6 text-foreground" />
                        </button>
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <input
                                type="text"
                                autoFocus
                                placeholder="Search games..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                maxLength={50}
                                onFocus={() => shouldFetch && setShowDropdown(true)}
                                className="w-full pl-10 pr-3 py-2 text-sm rounded-3xl border border-border bg-slate-700 text-foreground placeholder-muted-foreground outline-none shadow-inner"
                            />
                            {renderSearchDropdown()}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Mobile: Hamburger Menu */}
                        <button
                            className="p-2 mr-2 rounded-lg hover:bg-white/5 lg:hidden"
                            onClick={onMenuClick}
                            aria-label="Toggle Menu"
                        >
                            <Menu className="w-6 h-6 text-foreground" />
                        </button>

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="">
                                <img src="/CenterLogoVariant.png" alt="Logo" className="w-28 md:w-40 lg:w-48 h-13 mt-1 -ml-2" />
                            </div>
                        </div>

                        {/* Center: Search (hidden on small screens) */}
                        <div ref={searchRef} className="hidden md:flex w-full md:flex-1 max-w-md lg:max-w-lg relative mx-2 md:mx-6">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search games..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                maxLength={50}
                                onFocus={() => shouldFetch && setShowDropdown(true)}
                                className="w-full pl-10 pr-3 py-2 text-sm rounded-3xl border border-border bg-slate-700 text-foreground placeholder-muted-foreground outline-none shadow-inner transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
                            />

                            {/* Search Dropdown */}
                            {showDropdown && renderSearchDropdown()}
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            {/* PWA Install Button */}
                            {isInstallable && (
                                <button
                                    onClick={handleInstallClick}
                                    className="flex items-center justify-center w-9 h-9 sm:w-auto sm:px-3 sm:py-1.5 bg-white/10 text-foreground border border-white/20 rounded-full sm:rounded-lg text-sm font-bold hover:bg-white/20 transition-all shadow-sm"
                                    title="Install App"
                                >
                                    <Download className="w-5 h-5 sm:w-4 sm:h-4 sm:mr-2" />
                                    <span className="hidden sm:inline">Install App</span>
                                </button>
                            )}

                            {/* Mobile: Search icon (toggles full bar) */}
                            <button
                                type="button"
                                className="md:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                                aria-label="Search"
                                onClick={() => setIsMobileSearchActive(true)}
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* User / Auth */}
                            {user.id ? (
                                <div className="flex items-center gap-3">

                                    <div className="relative" ref={notificationsRef}>
                                        <button
                                            onClick={() => setShowNotifications(!showNotifications)}
                                            className={`p-2 rounded-full transition-colors ${showNotifications ? 'bg-secondary/20 text-secondary' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                                        >
                                            <Bell className="w-5 h-5" />
                                            {unreadCount > 0 && (
                                                <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-[#0f0f12]"></span>
                                            )}
                                        </button>
                                        {renderNotificationsDropdown()}
                                    </div>

                                    <div className="hidden md:flex flex-col items-end">
                                        <span className="text-xs font-bold text-foreground">{user.name}</span>
                                        <span className="text-[10px] text-muted-foreground">Online</span>
                                    </div>
                                    {user.profile_pic ? (
                                        <img
                                            src={user.profile_pic}
                                            alt="User avatar"
                                            className="w-9 h-9 rounded-full border border-white/10 hover:border-primary/50 transition-colors object-cover"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full border border-white/10 hover:border-primary/50 transition-colors bg-secondary/20 flex items-center justify-center">
                                            <span className="text-secondary font-bold text-xs">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {/* Desktop: Login / Signup buttons */}
                                    <div className="hidden sm:flex items-center gap-3">
                                        <Link to="/login">
                                            <button className="bg-secondary px-4 py-1.5 rounded-lg text-sm font-bold text-primary hover:bg-secondary/90 transition-all shadow-[0_0_15px_rgba(188,19,254,0.2)]">
                                                Log In
                                            </button>
                                        </Link>
                                        <Link to="/signup">
                                            <button className="text-sm font-medium hover:text-foreground transition-colors">
                                                Sign Up
                                            </button>
                                        </Link>
                                    </div>

                                    {/* Mobile: Login icon only (like screenshot) */}
                                    <Link
                                        to="/login"
                                        className="sm:hidden w-9 h-9 rounded-full border border-white/10 bg-secondary/10 flex items-center justify-center hover:bg-secondary/20 hover:border-secondary transition-colors"
                                        aria-label="Log in"
                                    >
                                        <User className="w-5 h-5 text-secondary" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}