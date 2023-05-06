import React, { useState } from "react";

const MovieCard = ({ id, path, title, rating, year }) => {
  const [hover, setHover] = useState(false);
  if (path) {
    return (
      <div
        className="h-80 relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          className="absolute h-full w-full"
          alt="movie poster"
          src={`https://image.tmdb.org/t/p/w200${path}`}
        />
        <div
          className={`absolute top-0 h-full w-full text-center p-10 transition-all ease-in-out duration-900 bg-opacity-80 bg-neutral-900 ${
            hover ? null : "hidden"
          }`}
        >
          <h3 className="font-bold text-xl h-3/4">{title}</h3>
          <h5 className="text-red-500">{year}</h5>
          <h5 className="text-red-500">
            Rating: <span className="text-slate-50">{rating}</span>/10
          </h5>
        </div>
      </div>
    );
  } else {
    return (
        <div
          className="h-80 relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          
          <div
            className={`absolute top-0 h-full w-full text-center p-10 transition-all ease-in-out duration-900 bg-opacity-80 bg-neutral-900`}
          >
            <h3 className="font-bold text-xl h-3/4">{title}</h3>
            <h5 className="text-red-500">{year}</h5>
            <h5 className="text-red-500">
              Rating: <span className="text-slate-50">{rating}</span>/10
            </h5>
          </div>
        </div>
    )
  }
};

export default MovieCard;
