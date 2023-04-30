import React from "react";

const MovieCard = ({ id, path, title, rating, year }) => {
  

  return (
    <div>
      <img src={path} />
      <h3>{title}</h3>
      <h5>{year}</h5>
      <h5>Rating: {rating}/10</h5>
    </div>
  );
};

export default MovieCard;
