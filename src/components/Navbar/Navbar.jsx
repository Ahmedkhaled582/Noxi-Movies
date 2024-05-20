import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData , logOut}) {
  return (
    <>
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Noxe</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {userData?<ul className="navbar-nav align-items-center me-auto mb-2 mb-lg-0">
    <li className="nav-item">
      <Link className="nav-link" to="/">Home</Link>
    </li>
    <li className="nav-item">
    <Link to='/movies' className="nav-link">Movies</Link>
  </li> 
  <li className="nav-item">
  <Link className="nav-link" to="/tv">Tv</Link>
</li>
<li className="nav-item">
  <Link className="nav-link" to="/people">People</Link>
</li>

  </ul>:""}  
    

      <div className='d-flex align-items-center ms-auto flex-column flex-lg-row'>
      
      {userData?<><Link className='hov me-2' to="profile">Profile</Link><span className='hov' style={{cursor:"pointer"}} onClick={logOut}>LogOut</span></>:<>
      <Link className="hov" to="/register">Register</Link>
      <Link className='hov px-3' to="login">Login</Link>
      </>}
      
      </div>
    
    </div>
  </div>
</nav>

    </>
  )
}
