import React, { useState } from 'react';
import { useGetNotificationsQuery, useMarkNotificationReadMutation } from '../../services/redux/apis/auth';
import AppWrapper from '../../HOC/AppWrapper';
import { Bell, BellOff, Calendar, ChevronLeft, ChevronRight, ExternalLink, Mail, MailOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotificationsPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const navigate = useNavigate();

    const { data, isLoading, isFetching } = useGetNotificationsQuery({ page, limit });
    const [markRead] = useMarkNotificationReadMutation();

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;

        return date.toLocaleDateString();
    };

    const handleNotificationClick = async (notif: any) => {
        if (!notif.is_read) {
            await markRead(notif.id);
        }
        if (notif.url) {
            if (notif.url.startsWith('http')) {
                window.open(notif.url, '_blank');
            } else {
                navigate(notif.url);
            }
        }
    };

    const totalPages = data?.totalPages || 1;

    return (
        <AppWrapper>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-secondary/10 rounded-2xl">
                            <Bell className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                            <p className="text-muted-foreground mt-1">
                                Stay updated with the latest games and activities
                            </p>
                        </div>
                    </div>
                    {data && data.unreadCount > 0 && (
                        <div className="px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-sm font-semibold">
                            {data.unreadCount} Unread
                        </div>
                    )}
                </div>

                <div className="bg-muted/30 border border-border rounded-3xl overflow-hidden backdrop-blur-sm shadow-xl">
                    {isLoading ? (
                        <div className="p-12 flex flex-col items-center justify-center space-y-4">
                            <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
                            <p className="text-muted-foreground animate-pulse">Loading notifications...</p>
                        </div>
                    ) : (data?.notifications && data.notifications.length > 0) ? (
                        <div className="divide-y divide-border/50">
                            {data.notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    onClick={() => handleNotificationClick(notif)}
                                    className={`p-6 flex gap-4 hover:bg-muted/50 transition-all cursor-pointer group relative ${!notif.is_read ? 'bg-secondary/[0.02]' : ''}`}
                                >
                                    {!notif.is_read && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-r-full" />
                                    )}

                                    <div className={`mt-1 shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${!notif.is_read ? 'bg-secondary/20 text-secondary' : 'bg-muted text-muted-foreground'}`}>
                                        {!notif.is_read ? <Mail className="w-6 h-6" /> : <MailOpen className="w-6 h-6" />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className={`text-lg font-semibold truncate ${!notif.is_read ? 'text-foreground' : 'text-foreground/70'}`}>
                                                {notif.title}
                                            </h3>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1 mt-1">
                                                <Calendar className="w-3 h-3" />
                                                {formatTime(notif.sent_at)}
                                            </span>
                                        </div>
                                        <p className={`text-sm line-clamp-2 leading-relaxed mb-3 ${!notif.is_read ? 'text-muted-foreground font-medium' : 'text-muted-foreground/60'}`}>
                                            {notif.message}
                                        </p>

                                        {notif.url && (
                                            <div className="flex items-center gap-1.5 text-xs text-secondary font-bold uppercase tracking-wider group-hover:underline">
                                                View Details
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-20 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                                <BellOff className="w-10 h-10 text-muted-foreground/30" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">No notifications yet</h2>
                            <p className="text-muted-foreground max-w-xs">
                                When you receive notifications, they will appear here.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="p-5 bg-muted/50 border-t border-border flex items-center justify-between gap-4 flex-wrap">
                        <p className="text-sm text-muted-foreground">
                            Page <span className="font-semibold text-foreground">{page}</span> of{' '}
                            <span className="font-semibold text-foreground">{totalPages}</span>
                            {data?.total != null && (
                                <span className="ml-2 text-muted-foreground/50">
                                    ({data.total} total)
                                </span>
                            )}
                        </p>
                        <div className="flex items-center gap-1.5">
                            {/* Prev */}
                            <button
                                disabled={page === 1 || isFetching}
                                onClick={() => setPage(prev => prev - 1)}
                                className="p-2 rounded-xl bg-background border border-border hover:border-secondary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Page number buttons */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                .reduce<(number | 'ellipsis')[]>((acc, p, idx, arr) => {
                                    if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('ellipsis');
                                    acc.push(p);
                                    return acc;
                                }, [])
                                .map((p, idx) =>
                                    p === 'ellipsis' ? (
                                        <span key={`e-${idx}`} className="px-2 text-muted-foreground text-sm">…</span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            disabled={isFetching}
                                            className={`min-w-[36px] h-9 rounded-xl text-sm font-semibold border transition-all shadow-sm ${page === p
                                                    ? 'bg-secondary text-secondary-foreground border-secondary'
                                                    : 'bg-background border-border hover:border-secondary/50 text-foreground'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    )
                                )
                            }

                            {/* Next */}
                            <button
                                disabled={page === totalPages || isFetching}
                                onClick={() => setPage(prev => prev + 1)}
                                className="p-2 rounded-xl bg-background border border-border hover:border-secondary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppWrapper>
    );
};

export default NotificationsPage;
