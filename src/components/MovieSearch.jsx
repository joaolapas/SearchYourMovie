import React, { useState, useEffect } from "react";
import { search, latest, popular, topRated } from "./api";
import Modal from "./Modal";
import MovieCard from "./MovieCard";

const MovieSearch = () => {
  const [movie, setMovie] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);
  const [year, setYear] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  // ------ FETCHING THE SEARCH -----
  const fetching = async (movie, page) => {
    const data = await search(movie, page, year);
    setResult(data.results);
    setPage(data.page);
    setTotalPages(data.total_pages);
  };
  // ------ FETCHING SUGESTIONS ------
  const fetchingLatest = async () => {
    const data = await latest(page);
    setResult(data.results);
    setPage(data.page);
    setTotalPages(data.total_pages);
  };
  const fetchingPopular = async () => {
    const data = await popular(page);
    setResult(data.results);
    setPage(data.page);
    setTotalPages(data.total_pages);
  };
  const fetchingTopRated = async () => {
    const data = await topRated(page);
    setResult(data.results);
    setPage(data.page);
    setTotalPages(data.total_pages);
  };

  // ----- SUBMIT SEARCH -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetching(movie, page);
  };

  //----- CHANGE PAGES ------
  const nextPage = (movie, page) => {
    fetching(movie, page + 1);
  };
  const prevPage = (movie, page) => {
    fetching(movie, page - 1);
  };

  //-----OPEN & CLOSE MODAL-------
  const handleOpenModal = (id) => {
    setIsOpen(true);
    setId(id);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setId("");
  };

  // ------ SCROLL TO THE TOP -----
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="flex flex-col items-center px-40 w-3/4 sm:w-screen">
      <div
        className="modal"
        style={{
          display: isOpen ? "block" : "none",
        }}
      >
        {isOpen && (
          <Modal id={id} isOpen={isOpen} handleCloseModal={handleCloseModal} />
        )}
      </div>
      <form
        className="flex flex-col items-center scale-75 sm:scale-100"
        onSubmit={handleSubmit}
      >
        <div className="bg-slate-50 flex flex-nowrap items-center rounded-full px-1 transition-all ease-in-out duration-900 w-sm">
          <input
            className="focus:outline-none border-slate-50 rounded-full px-5 m-2 text-slate-700 text-xl w-sm"
            type="text"
            onChange={(e) => setMovie(e.target.value)}
            required
          />
          <button
            className="border-2 bg-red-500 text-neutral-700 h-10 border-slate-50 rounded-full px-5 hover:bg-slate-50 hover:transition-all transition-all"
            type="submit"
          >
            Search
          </button>
        </div>
        {result.length !== 0 && (
          <div className="flex justify-between mt-6">
            <div className="flex justify-center flex-wrap">
              <input
                className="border-2 border-slate-50 rounded-full px-3 mx-2 text-slate-700"
                type="number"
                placeholder="Year"
                min={1900}
                max={2023}
                onChange={(e) => setYear(e.target.value)}
              />
              <button
                className="border-2 border-slate-50 rounded-full px-5 hover:bg-slate-50 hover:transition-all transition-all"
                onClick={handleSubmit}
              >
                Filter by Year
              </button>
            </div>
            <div className="sm:ml-20 flex flex-wrap justify-center">
              <button
                className="border-2 border-slate-50 rounded-full px-5 hover:bg-slate-50 hover:transition-all transition-all"
                onClick={async () => await fetchingLatest()}
              >
                Latest
              </button>
              <button
                className="border-2 border-slate-50 rounded-full px-5 hover:bg-slate-50 hover:transition-all transition-all"
                onClick={async () => await fetchingPopular()}
              >
                Popular
              </button>
              <button
                className="border-2 border-slate-50 rounded-full px-5 hover:bg-slate-50 hover:transition-all transition-all"
                onClick={async () => await fetchingTopRated()}
              >
                Top Rated
              </button>
            </div>
          </div>
        )}
      </form>
      <div className="flex w-full sm:w-10/12 flex-wrap gap-6 my-10 justify-center">
        {result.length !== 0
          ? result.map((result) => {
              return (
                <div
                  className="flex shrink-0 flex-col w-52 rounded-2xl overflow-hidden text-slate-50 shadow-lg shadow-black flex-wrap sm:hover:scale-110 transition-all ease-in duration-800 hover:cursor-pointer"
                  key={result.id}
                  onClick={() => handleOpenModal(result.id)}
                >
                  <MovieCard
                    path={result.poster_path}
                    id={result.id}
                    title={result.title}
                    rating={result.vote_average}
                    year={result.release_date.slice(0, 4)}
                  />
                </div>
              );
            })
          : totalPages !== 0 && (
              <h1 className="text-3xl text-slate-50">No movies found!</h1>
            )}
      </div>
      {totalPages !== 0 && result.length !== 0 && (
        <div className="flex w-10/12 justify-around">
          <button
            className="border-2 border-slate-50 rounded-full px-5 hover:bg-slate-50 hover:transition-all transition-all my-10"
            onClick={() => prevPage(movie, page)}
            disabled={page !== 1 ? false : true}
          >
            Prev
          </button>
          <div className="my-10">
            {page}/{totalPages}
          </div>

          <button
            className="border-2 border-slate-50 rounded-full px-5 hover:bg-slate-50 hover:transition-all transition-all my-10"
            onClick={() => nextPage(movie, page)}
            disabled={page !== totalPages && totalPages !== 0 ? false : true}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
