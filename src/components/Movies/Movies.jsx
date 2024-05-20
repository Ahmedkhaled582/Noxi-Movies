import React, { useContext } from 'react'
import { MediaContext } from '../../Context/MediaContext'
import ItemMovie from '../itemMovie/ItemMovie'

export default function Movies() {
  let {movies,person,tv} = useContext(MediaContext)
  return (
    <div className='container'>
    <div className="row">
    <div className="col-md-4 d-flex align-items-center">
    <div>
    <div className='brdr mb-3 w-25'></div>
    <h2 className='h4'>Trending <br /> Movies <br/> To Watch Right Now</h2>
    <p className='text-secondary py-3'>Most Watched Movies By Days</p>
    <div className='brdr mb-3 w-100'></div>
    </div>
    </div>
    {movies.map((movie , index) => ( <ItemMovie movie={movie} key={index} />
    )
    )}
   
    </div>
    </div>
  )
}
