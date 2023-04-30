import React, { useState } from "react";
import { search } from "./api";
import MovieCard from "./MovieCard";

const MovieSearch = () => {
  const [movie, setMovie] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  let [totalPages, setTotalPages] = useState(0);

  const fetching = async (movie, page) => {
    const data = await search(movie, page);
    setResult(data.results);
    setPage(data.page);
    setTotalPages(data.total_pages);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetching(movie, page);
  };

  const nextPage = (movie, page) => {
    fetching(movie, page + 1);
  };
  const prevPage = (movie, page) => {
    fetching(movie, page - 1);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setMovie(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {result.map((result) => {
        return (
          <div key={result.id}>
            <MovieCard
              path={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
              id={result.id}
              title={result.title}
              rating={result.vote_average}
              year={result.release_date.slice(0,4)}
            />
          </div>
        );
      })}
      {page !== 1 && (
        <button onClick={() => prevPage(movie, page)}>Prev</button>
      )}
      {page !== totalPages && totalPages !== 0 && (
        <button onClick={() => nextPage(movie, page)}>Next</button>
      )}
    </div>
  );
};

export default MovieSearch;
