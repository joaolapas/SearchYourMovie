import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    <div className="flex flex-col w-full items-center bg-neutral-800 text-red-500 h-fit">
      <div className="flex flex-col w-full items-center min-h-screen">
        <a href='/'><h1 className="text-6xl m-8">
          Search<span className="text-slate-50">Your</span>Movie
        </h1></a>
        <MovieSearch className="m-4" />
      </div>
      <footer className="w-full h-28 bg-black flex justify-center items-center text-slate-50 justify-end">
        Coded by João Lapas for study purposes
      </footer>
    </div>
  );
}

export default App;
