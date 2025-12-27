import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700 ">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
        
        <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Page Not Found
        </h2>

        <p className="text-slate-300 mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link to="/">
          <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-green-500 hover:scale-105 shadow-lg">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
