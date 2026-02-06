import { useEffect } from 'react';

// Declare googletag for TypeScript
declare global {
    interface Window {
        googletag: any;
    }
}

const TopBannerAd = () => {
    useEffect(() => {
        const { googletag } = window;
        let adSlot: any = null;

        if (googletag && googletag.cmd) {
            googletag.cmd.push(() => {
                const slots = googletag.pubads().getSlots();
                adSlot = slots.find((s: any) => s.getSlotElementId() === 'div-gpt-ad-1770210452174-0');
                googletag.display('div-gpt-ad-1770210452174-0');
            });
        }

        // Scaling logic to make fixed-size ads responsive
        const adjustAdScale = () => {
            const container = document.getElementById('div-gpt-ad-1770210452174-0');
            const iframe = container?.querySelector('iframe');
            if (iframe && container) {
                const containerWidth = container.offsetWidth;
                const adWidth = parseInt(iframe.getAttribute('width') || '0');
                const adHeight = parseInt(iframe.getAttribute('height') || '0');

                if (adWidth > containerWidth && containerWidth > 0) {
                    const scale = containerWidth / adWidth;
                    iframe.style.transform = `scale(${scale})`;
                    iframe.style.transformOrigin = 'top center';
                    container.style.height = `${adHeight * scale}px`;
                    container.style.width = '100%';
                } else {
                    iframe.style.transform = 'none';
                    container.style.height = adHeight > 0 ? `${adHeight}px` : 'auto';
                }
            }
        };

        let lastWidth = 0;
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                if (Math.abs(width - lastWidth) > 50) {
                    lastWidth = width;
                    adjustAdScale();
                    // Optional: refresh ad if space increased significantly
                    if (googletag && googletag.pubads && adSlot) {
                        googletag.cmd.push(() => {
                            googletag.pubads().refresh([adSlot]);
                        });
                    }
                } else {
                    adjustAdScale();
                }
            }
        });

        const container = document.getElementById('div-gpt-ad-1770210452174-0');
        if (container) resizeObserver.observe(container);

        const timer = setInterval(adjustAdScale, 2000);

        return () => {
            clearInterval(timer);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className="w-[calc(100%+1.5rem)] -mx-3 lg:mx-0 lg:w-full my-4 flex justify-center overflow-hidden">
            <div
                id="div-gpt-ad-1770210452174-0"
                className="gpt-ad-container min-h-[50px] lg:min-h-[90px]"
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'hidden' }}
            />
        </div>
    );
};

export default TopBannerAd;

