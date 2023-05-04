import React from "react";

const MovieCard = ({ id, path, title, rating, year }) => {
  if (path) {
    return (
      <div className='h-96'>
        <img
          className="max-h-60 w-full"
          src={`https://image.tmdb.org/t/p/w200${path}`}
        />
        <div className="flex flex-col justify-between text-center h-32 px-5">
          <h3 className="font-bold">{title}</h3>
          <h5 className="text-red-500">{year}</h5>
          <h5 className="text-red-500">
            Rating: <span className="text-slate-50">{rating}</span>/10
          </h5>
        </div>
      </div>
    );
  }
};

export default MovieCard;
