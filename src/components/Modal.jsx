import React, { useState, useEffect } from "react";
import { getDetails, getVideoById } from "./api";

const Modal = ({ id, isOpen, handleCloseModal }) => {
  const [result, setResult] = useState("");
  const [details, setDetails] = useState("");
  let url = "";

  //----- INITIAL FETCH -----
  useEffect(() => {
    fetchVideoById();
    fetchDetails();
  }, [isOpen]);

  //------ SCROLL TO THE TOP ------
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isOpen]);
  // . ---- FETCH VIDEO BY ID ------
  const fetchVideoById = async () => {
    const data = await getVideoById(id);
    if (data.results.length !== 0) {
      setResult(data.results[0]);
    }
  };

  // ----- FETCH DETAILS -------
  const fetchDetails = async () => {
    const data = await getDetails(id);
    setDetails(data);
  };
  if (result && result.site === "YouTube") {
    url = "https://www.youtube.com/embed/";
  } else if (result && result.site === "Vimeo") {
    url = "https://vimeo.com/";
  }

  return (
    <div className="flex flex-col items-center fixed bg-black rounded-3xl z-10 top-5 bottom-5 left-10 right-10 p-10 px-20 ">
      <div className="flex justify-between flex-shrink h-5/6">
        <div className="w-7/12 p-10">
          <h1 className="text-4xl text-slate-50 mb-10 h-10 object-scale-down">
            {details.original_title}
          </h1>
          <p className="mb-5 text-lg">{details.overview}</p>
          <div className="flex w-full justify-between mt-10">
            <div>
              <h6 className="text-slate-50 mb-5">
                Release date: {details.release_date}
              </h6>
              <h4 className="text-slate-50 mb-5">
                RATING:{Math.round(details.vote_average)}/10
              </h4>
            </div>
            <div className="flex justify-center">
              {result && (
                <iframe
                  src={`${url}${result.key}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              )}
            </div>
          </div>
        </div>
        <img
          className="rounded-3xl w-4/12"
          src={`https://image.tmdb.org/t/p/w200${details.poster_path}`}
        />
      </div>
      <button
        className="w-52 border-2 mt-10 border-slate-50 rounded-full px-5 hover:bg-slate-50 hover:transition-all transition-all my-10"
        onClick={() => handleCloseModal()}
      >
        Close
      </button>
    </div>
  );
};

export default Modal;
