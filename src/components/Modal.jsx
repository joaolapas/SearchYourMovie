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
 console.log(details.poster_path)
  return (
    <div
      className="flex overflow-scroll flex-col items-center justify-center fixed bg-black bg-opacity-80 rounded-3xl z-30 top-0 bottom-0 right-0 left-0 pt-10"
    >
    
      <div className={`flex flex-col items-center absolute  rounded-3xl z-30 sm:w-2/3 sm:h-3/4 md:h-5/6 md:w-3/4 py-10`}>
      <div onClick={() => handleCloseModal()} className='fixed text-4xl text-slate-50 z-50 top-5 right-5 cursor-pointer'>x</div>  
      <div className="flex items-center justify-between flex-wrap h-5/6 w-10/12 mt-28 lg:mt-0 md:scale-75">
          <div className="w-11/12 sm:w-6/12 text-center md:text-left pl-8 pt-48 sm:pt-0">
            <h1 className="text-2xl sm:text-4xl text-slate-50 mb-10">
              {details.original_title}
            </h1>
            <p className="mb-5 text-lg">{details.overview}</p>
            <div className="lg:flex justify-between mt-10">
              <div>
                <h6 className="text-slate-50 mb-5">
                  Release date: {details.release_date}
                </h6>
                <h4 className="text-slate-50 mb-5">
                  RATING:{Math.round(details.vote_average)}/10
                </h4>
              </div>
              <div className="flex justify-center scale-75 shrink-1">
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
            className="rounded-3xl lg:w-2/5 shrink-0 m-auto"
            src={`https://image.tmdb.org/t/p/w200${details.poster_path}`}
          />
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
