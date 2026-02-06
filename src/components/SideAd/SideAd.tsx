import { useEffect } from 'react';

// Declare googletag for TypeScript
declare global {
    interface Window {
        googletag: any;
    }
}

const SideAd = () => {
    useEffect(() => {
        const { googletag } = window;
        if (googletag && googletag.cmd) {
            googletag.cmd.push(() => {
                googletag.display('div-gpt-ad-1770213234932-0');
            });
        }
    }, []);

    return (
        <aside className="hidden lg:flex w-auto h-[calc(100vh-4rem)] fixed right-0 top-16 bg-background border-l border-border z-30 flex-col overflow-y-auto custom-scrollbar pb-20 transition-all duration-300">
            <div className="w-full flex flex-col items-center gap-6 px-4">

                <div className="w-full text-center py-2 m-4">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Sponsored</span>
                </div>
                <div
                    id='div-gpt-ad-1770213234932-0'
                    style={{ minWidth: '120px', minHeight: '500px' }}
                >
                </div>
            </div>
        </aside>
    )
}

export default SideAd

