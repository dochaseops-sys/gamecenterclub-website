import { Link } from "react-router-dom";
import gamepad from "../assets/game.svg";

const GameHeader = () => {
  return (
    <header className="w-full px-[5%]">
      <div className="relative max-w-7xl mx-auto mt-6 bg-[url('/src/assets/bg.svg')] h-[500px] md:h-full bg-no-repeat overflow-hidden rounded-[80px] p-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <div className="text-white font-bold text-xl">
              <span className="block leading-none text-[#FFFFFF]">Game</span>
              <span className="block leading-none text-[#FFFFFF]">Center</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-white">
            <Link to="/" className="hover:opacity-80">
              Home
            </Link>
            <a href="#" className="hover:opacity-80">
              Play Games
            </a>
            <a href="#" className="hover:opacity-80">
              Profile
            </a>
          </nav>

          <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-full font-medium">
            Log In
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12 py-12 md:py-20">
          <div className="text-white z-10">
            <h1 className="text-3xl md:text-6xl font-bold leading-tight">
              <span className="text-yellow-400">Games</span> for your
              <br />
              <span className="text-white">Entertainment</span>
              <br />
              and <span className="text-yellow-400">Fun</span>
            </h1>
          </div>

          <div className="relative flex justify-center md:justify-end mt-8 md:mt-0">
            <img src={gamepad} alt="Game Controller" />
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500 rounded-full opacity-40" />
          <div className="absolute top-10 right-20 w-40 h-40 bg-blue-500 rounded-full opacity-30" />
        </div>
      </div>

      {/* Our Games Section Title */}
      <section className="max-w-7xl mx-auto mt-16 px-2">
        <h2 className="text-2xl font-bold">
          Our <span className="italic">Games</span>
        </h2>
        <p className="text-gray-600 max-w-md mt-2">
          Explore a world of fun and adventure with our collection of exciting
          games. Whether you're into fast-paced action, mind-bending puzzles, or
          immersive stories, there's something here for everyone to enjoy.
        </p>
      </section>
    </header>
  );
};

export default GameHeader;
