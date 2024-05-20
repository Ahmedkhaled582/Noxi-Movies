import React, { useContext} from 'react'
import ItemMovie from './../itemMovie/ItemMovie';
import { MediaContext } from '../../Context/MediaContext';
export default function Home() {

  let {movies,person,tv} = useContext(MediaContext)
  return (
    <>
    <div className="container">
    <div className="row">
    <div className="col-md-4 d-flex align-items-center">
    <div>
    <div className='brdr mb-3 w-25'></div>
    <h2 className='h4'>Trending <br /> Movies <br/> To Watch Right Now</h2>
    <p className='text-secondary py-3'>Most Watched Movies By Days</p>
    <div className='brdr mb-3 w-100'></div>
    </div>
    </div>
    {movies.slice(0,10).map((movie , index) => ( <ItemMovie movie={movie} key={index} />
    )
    )}
   
    </div>


    <div className="row py-4">
    <div className="col-md-4 d-flex align-items-center">
    <div>
    <div className='brdr mb-3 w-25'></div>
    <h2 className='h4'>Trending <br /> Tv <br/> To Watch Right Now</h2>
    <p className='text-secondary py-3'>Most Watched Movies By Days</p>
    <div className='brdr mb-3 w-100'></div>
    </div>
    </div>
    {tv.slice(0,10).map((movie , index) => ( <ItemMovie movie={movie} key={index} />
    )
    )}
    </div>

    <div className="row">
    <div className="col-md-4 d-flex align-items-center">
    <div>
    <div className='brdr mb-3 w-25'></div>
    <h2 className='h4'>Trending <br /> People <br/> To Watch Right Now</h2>
    <p className='text-secondary py-3'>Most Watched Movies By Days</p>
    <div className='brdr mb-3 w-100'></div>
    </div>
    </div>
    {person.slice(0,10).map((movie , index) => ( <ItemMovie movie={movie} key={index} />
    )
    )}
    </div>
    </div>
    </>
  )
}
