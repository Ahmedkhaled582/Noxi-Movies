import React from "react";
import { Link } from 'react-router-dom';

export default function ItemMovie({ movie }) {
  return (
    <>
    
      <div className="col-md-2 col-6">
      <div className="movie position-relative">
      <Link to={'/moviedetails/'+movie.id+'/'+movie.media_type}>
        <img
          className="w-100"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500` + movie.poster_path
              : `https://image.tmdb.org/t/p/w500` + movie.profile_path
          }
          alt=""
        />
        <h3 className="h6 py-1">
          {movie.title}
          {movie.name}
        </h3>
        {movie.vote_average>0?<div className="vote p-2 text-center position-absolute top-0 end-0">{movie.vote_average.toFixed(1)}</div>:""}
        
        </Link>
        </div>
      </div>
    </>
  );
}
