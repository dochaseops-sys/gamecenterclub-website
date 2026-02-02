import { Maximize } from "lucide-react";
// import Ad from "../../components/ads/Ad";
import AppWrapper from "../../HOC/AppWrapper"
import SectionWrapper from "../../HOC/SectionWrapper";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAddGameToRecentMutation, useGetGameByIdQuery, useGetGamesQuery } from "../../services/redux/apis/games";

const Game = () => {
  const { id } = useParams<{ id: string }>();
  const gameRef = useRef<HTMLIFrameElement | null>(null);

  const { data: game, isLoading, error } = useGetGameByIdQuery(Number(id));
  const { data: allGames = [] } = useGetGamesQuery();
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
          <p className="text-muted-foreground">Loading game...</p>
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

        <div className="mb-5">
          {/* Game Title and Description */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-white mb-2">{game.name}</h1>
            <p className="text-muted-foreground">{game.description}</p>
            <div className="flex gap-3 mt-2 text-sm text-muted-foreground">
              <span>Category: {game.category?.title}</span>
              <span>•</span>
              <span>Engine: {game.gameEngine}</span>
              {game.mobileSupport && (
                <>
                  <span>•</span>
                  <span>Mobile Supported</span>
                </>
              )}
            </div>
          </div>

          <iframe
            src={game.gameFile}
            title={game.name}
            className="w-full h-96 lg:h-[400px] border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ref={gameRef}
          />

          <div className="flex items-center justify-end p-3 ">
            <button onClick={onMaximize}>
              <Maximize />
            </button>
          </div>
        </div>


        {/* Similar games */}
        <SectionWrapper games={similarGames} title="Similar Games" />
      </div>
    </AppWrapper>
  )
}

export default Game
