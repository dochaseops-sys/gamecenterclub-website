const SideAd = () => {
    return (
        <aside className="hidden lg:flex w-[360px] h-[calc(100vh-4rem)] fixed right-0 top-16 bg-background border-l border-border z-30 flex-col overflow-y-auto custom-scrollbar pb-20 transition-all duration-300">
            <div className="w-full flex flex-col items-center gap-6 px-4">

                <div className="w-full text-center py-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Sponsored</span>
                </div>

                {/* 336x280 Large Rectangle */}
                <div className="w-[300px] h-[280px] shrink-0 bg-card border border-border rounded-md flex items-center justify-center relative overflow-hidden shadow-sm group cursor-pointer hover:border-primary/50 transition-colors">
                    <img
                        src="https://images.pexels.com/photos/228963/pexels-photo-228963.jpeg"
                        alt="Side Ad 1"
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-4 left-4 z-10">
                        <p className="text-white font-bold text-lg leading-tight">Level Up<br />Your Setup</p>
                        <span className="text-xs text-primary font-semibold mt-1 inline-block">Shop Now &rarr;</span>
                    </div>
                    <span className="absolute top-2 right-2 text-[10px] text-white/50 bg-black/30 px-1 rounded border border-white/10 uppercase tracking-widest">Ad</span>
                </div>

                {/* 300x600 Half Page or 320x480 */}
                <div className="w-[300px] h-[600px] shrink-0 bg-card border border-border rounded-md flex items-center justify-center relative overflow-hidden shadow-sm group">
                    <img
                        src="https://images.pexels.com/photos/4842562/pexels-photo-4842562.jpeg"
                        alt="Side Ad 2"
                        className='absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity'
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                        <h4 className="text-white font-bold text-xl mb-2">Pro Gaming Series</h4>
                        <button className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors">
                            View Collection
                        </button>
                    </div>
                </div>

                {/* 300x250 Medium Rectangle */}
                <div className="w-[300px] h-[250px] shrink-0 bg-card border border-border rounded-md flex items-center justify-center relative overflow-hidden shadow-sm group cursor-pointer">
                    <img
                        src="https://images.pexels.com/photos/1373100/pexels-photo-1373100.jpeg"
                        alt="Side Ad 3"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                        <span className="text-white font-bold text-2xl tracking-widest border-2 border-white px-4 py-2 uppercase">Sale</span>
                    </div>
                </div>

            </div>
        </aside>
    )
}

export default SideAd
