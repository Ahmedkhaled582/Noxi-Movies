import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MediaContext = createContext(null);

export default function MediaContextProvider(props){

    const [movies , setMovies] = useState([])
    const [person , setPerson] = useState([])
    const [tv , setTv] = useState([])
  
   async function getMovies(type , func ){
    const {data} =  await axios.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=79ddabaf909aa7717beb4a4a68db5bbe`)
    func(data.results)
  }
  
      useEffect(()=>{
        getMovies('movie' , setMovies)
        getMovies('person' , setPerson)
        getMovies('tv' , setTv)
      },[])

    return <MediaContext.Provider value={{movies,person,tv}}>
            {props.children}
        </MediaContext.Provider>

}