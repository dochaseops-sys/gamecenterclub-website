import { useEffect, useState } from "react";
import { Skeleton } from "antd";

type Game = {
  title: string;
  link: string;
  description: string;
  logo: string;
};

const GameCenter = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch(
        "https://dochase.marketjs-cloud2.com/gameslist.xml"
      );
      const text = await res.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");

      const gameNodes = Array.from(xml.getElementsByTagName("game"));

      const parsedGames: Game[] = gameNodes.map((game) => ({
        title: game.getElementsByTagName("title")[0]?.textContent ?? "",
        link: game.getElementsByTagName("link")[0]?.textContent ?? "",
        description:
          game.getElementsByTagName("description")[0]?.textContent ?? "",
        logo: game.getElementsByTagName("game_logo")[0]?.textContent ?? "",
      }));

      setGames(parsedGames);
      setLoading(false);
    };

    fetchGames();
  }, []);

  if (activeGame) {
    return (
      <div className="w-full h-screen flex flex-col">
        <div className="p-4 bg-white shadow flex items-center justify-between">
          <h2 className="font-semibold text-lg">{activeGame.title}</h2>
          <button
            onClick={() => setActiveGame(null)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Exit Game
          </button>
        </div>

        <iframe
          src={activeGame.link}
          title={activeGame.title}
          className="flex-1 w-full border-none"
          allowFullScreen
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-[5%] bg-[url('/src/assets/cover.svg')] bg-center">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border border-[#FFE1B5] rounded-xl p-4 bg-white sadow-sm"
          >
            <Skeleton.Image
              active
              className="w-full h-[180px] mb-4 rounded-lg"
            />

            <Skeleton active title={{ width: "70%" }} paragraph={{ rows: 2 }} />

            <Skeleton.Button active block className="mt-4 h-10 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[url('/src/assets/cover.svg')] bg-center h-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-[5%]">
          {games.map((game) => (
            <div
              key={game.title}
              className="border border-[#FFE1B5] rounded-xl p-4 bg-white shadow-sm flex flex-col"
            >
              <img
                src={game.logo}
                alt={game.title}
                className="rounded-lg mb-4"
              />

              <h3 className="font-semibold text-lg mb-2">{game.title}</h3>

              <p className="text-sm text-gray-600 flex-1">{game.description}</p>

              <button
                onClick={() => setActiveGame(game)}
                className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-full"
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCenter;
