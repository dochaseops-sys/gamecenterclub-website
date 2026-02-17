import { WifiOff, RefreshCw } from 'lucide-react';

const NoInternet = () => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <WifiOff className="w-12 h-12 text-destructive" />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3">No Internet Connection</h1>
            <p className="text-muted-foreground max-w-md mb-8">
                It looks like you're offline. Please check your internet connection and try again to continue using GamingCenter.
            </p>

            <button
                onClick={handleReload}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try to Reconnect
            </button>

            <p className="mt-8 text-xs text-muted-foreground italic">
                You will be automatically reconnected once your internet returns.
            </p>
        </div>
    );
};

export default NoInternet;
