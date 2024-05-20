import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {

    const params = useParams();
    const [movieDetails , setMovieDetails] = useState({})
    const [similarMovie , setSimilarMovie] = useState([])


  async  function getMovieDetails(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}?api_key=79ddabaf909aa7717beb4a4a68db5bbe`)
        setMovieDetails(data)
      }
      async  function getSimilarMovie(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/${params.media_type}/${params.id}/similar?api_key=79ddabaf909aa7717beb4a4a68db5bbe`)
        setSimilarMovie(data.results)
      }


    useEffect(()=>{
      getMovieDetails()
      getSimilarMovie()
    },[])
  return (
    <>
    <div className="container">
    <div className="row">
    <div className="col-md-4">
    <img
    className="w-100"
    src={
      movieDetails.poster_path
        ? `https://image.tmdb.org/t/p/w500` + movieDetails.poster_path
        : `https://image.tmdb.org/t/p/w500` + movieDetails.profile_path
    }
    alt=""
  />
    </div>
    <div className="col-md-8">
    <h2>{movieDetails.title}{movieDetails.name}</h2>
    <p className='text-secondary'>{movieDetails.overview}</p>
    </div>
    
    </div>
    <div className="row gy-3 mt-3">
    {similarMovie.slice(0,10).map((moviesimilar) => (
      <div className="col-md-2">
      <img className='w-100' src={`https://image.tmdb.org/t/p/w500`+moviesimilar.poster_path} alt="" />
      <h3 className="h6 py-1">
          {moviesimilar.title}
          {moviesimilar.name}
        </h3>
        {similarMovie.vote_average>0?<div className="vote p-2 text-center position-absolute top-0 end-0">{similarMovie.vote_average.toFixed(1)}</div>:""}

      </div>
  ))}
    </div>
    </div>
    </>
  )
}
