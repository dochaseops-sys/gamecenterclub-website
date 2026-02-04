import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate()
  const onPress = () => {
    navigate('/')
  }

  return (
    <section className="relative min-h-screen bg-gray-900 overflow-hidden flex items-center justify-center mb-16 p-6">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-600 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-cyan-600 blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="relative mb-8">
          <h1 className="text-[120px] md:text-[180px] font-bold text-white tracking-tighter">
            <span className="relative">
              <span className="relative text-secondary"></span>
            </span>
          </h1>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Page Not Found
        </h2>

        <p className="text-gray-400 text-lg mb-10">
          Oops! The page you're looking for has vanished into the digital void.
        </p>

        <button className="relative px-8 py-4 bg-secondary text-white font-bold rounded-lg overflow-hidden group" onClick={onPress}>
          <span className="relative z-10">Back to Home</span>
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </section>
  );
}
