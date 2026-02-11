import { Maximize, Share2 } from "lucide-react";
// import Ad from "../../components/ads/Ad";
import AppWrapper from "../../HOC/AppWrapper"
import SectionWrapper from "../../HOC/SectionWrapper";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAddGameToRecentMutation, useGetGameByIdQuery, useGetGamesQuery } from "../../services/redux/apis/games";
import Loader from "../../loader/Loader";
import AuthBanner from "../../components/authBanner/AuthBanner";
import ShareModal from "../../components/share/ShareModal";
import { useState } from "react";

const Game = () => {
  const { id } = useParams<{ id: string }>();
  const gameRef = useRef<HTMLIFrameElement | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data: game, isLoading, error } = useGetGameByIdQuery(Number(id));
  const { data: gamesResponse } = useGetGamesQuery();
  const allGames = gamesResponse?.data || [];
  const [addGameToRecent] = useAddGameToRecentMutation();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (game?.id) {
      timer = setTimeout(() => {
        addGameToRecent(game.id);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [game?.id, addGameToRecent]);

  const onMaximize = () => {
    gameRef.current?.requestFullscreen()
  }

  if (isLoading) {
    return (
      <AppWrapper>
        <div className="flex items-center justify-center h-96">
          <Loader />
        </div>
      </AppWrapper>
    );
  }

  if (error || !game) {
    return (
      <AppWrapper>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Game not found</p>
        </div>
      </AppWrapper>
    );
  }

  // Filter similar games by category
  const similarGames = allGames.filter(g => g.categoryId === game.categoryId && g.id !== game.id).slice(0, 8);

  return (
    <AppWrapper>
      <div className="flex flex-col">
        {/* <Ad /> */}

        <AuthBanner />
        <div className="mb-5">
          {/* Game Title and Description */}
          <iframe
            src={game.gameFile}
            title={game.name}
            className="w-full h-96 lg:h-[400px] border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ref={gameRef}
          />

          <div className="flex items-center justify-end p-3">
            <button
              onClick={onMaximize}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Maximize"
            >
              <Maximize className="text-white" />
            </button>
          </div>

          <div className="mt-6 px-2 md:px-4">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
              {game.name}
            </h1>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-2 bg-[#1e1e2d] border border-white/10 hover:bg-[#2a2a3a] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all w-fit mb-10 shadow-lg"
            >
              <Share2 size={18} />
              Share
            </button>

            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-8 gap-y-4 mb-10">
              {game.authorName && (
                <>
                  <div className="text-gray-400 font-medium">Developer:</div>
                  <div className="text-[#a4a4ff] font-bold">{game.authorName}</div>
                </>
              )}

              <div className="text-gray-400 font-medium">Rating:</div>
              <div className="text-white font-bold text-lg flex items-center gap-2">
                {game.trendingScore ? game.trendingScore.toFixed(1) : '8.5'}
                <span className="text-gray-500 font-normal text-sm">
                  ({typeof game.playCount === 'number' ? game.playCount.toLocaleString() : (game.playCount || '10,000+')}) votes
                </span>
              </div>

              <div className="text-gray-400 font-medium">Released:</div>
              <div className="text-white font-bold">
                {new Date(game.createdAt || game.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>

              <div className="text-gray-400 font-medium">Technology:</div>
              <div className="text-white font-bold uppercase">{game.gameEngine}</div>

              <div className="text-gray-400 font-medium">Platforms:</div>
              <div className="text-white font-bold">
                Browser (desktop{game.mobileSupport ? ", mobile, tablet" : ""})
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {game.category && (
                <div className="bg-[#1e1e2d] border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#2a2a3a] transition-colors cursor-pointer group shadow-md">
                  <span className="text-white font-bold text-sm">{game.category.title}</span>
                </div>
              )}
              {game.mobileSupport && (
                <div className="bg-[#1e1e2d] border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#2a2a3a] transition-colors cursor-pointer group shadow-md">
                  <span className="text-white font-bold text-sm">Mobile</span>
                </div>
              )}
            </div>

            <div className="max-w-4xl bg-white/5 p-6 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Description</h3>
              <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                {game.description}
              </p>
            </div>
          </div>
        </div>


        {/* Similar games */}
        <SectionWrapper games={similarGames} title="Similar Games" />
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        gameName={game?.name || ""}
        gameUrl={window.location.href}
      />
    </AppWrapper>
  )
}

export default Game
