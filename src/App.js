import MovieSearch from "./components/MovieSearch";

function App() {
  return (
    <div className="flex flex-col w-full items-center bg-[url('/src/assets/cinema.jpg')] bg-cover text-red-500 h-fit">
      <div className="flex flex-col w-10/12 items-center  justify-center min-h-screen">
        <a href='/SearchYourMovie/'><h1 className="text-2xl sm:text-6xl my-8">
          Search<span className="text-slate-50">Your</span>Movie
        </h1></a>
        <MovieSearch className="my-4" />
      </div>
      <footer className="w-full text-sm sm:text-xl h-28 bg-black flex justify-center items-center text-slate-50 justify-end">
        Coded by João Lapas for study purposes
      </footer>
    </div>
  );
}

export default App;
