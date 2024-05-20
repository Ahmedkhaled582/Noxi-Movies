import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Movies from './components/Movies/Movies';
import ItemMovie from './components/itemMovie/ItemMovie';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MediaContextProvider from './Context/MediaContext';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Tv from './components/Tv/Tv';
import People from './components/People/People';


function App() {

  useEffect(()=>{
  if(localStorage.getItem('userToken') !== null){
    saveUserData()
  }
  },[])

  const [userData , setUserData] = useState(null)

  function saveUserData(){
    let encodeToken =localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodeToken)
    console.log(decodedToken)
    setUserData(decodedToken)
  }

  function logOut(){
    localStorage.removeItem('userToken')
    setUserData(null)
    return <Navigate to='/login'/>
  }

  let routers = createHashRouter([
    {path:'/' , element: <Layout userData={userData} logOut={logOut}/>, children:[
      {index:true , element:<ProtectedRoute userData={userData}><Home/></ProtectedRoute>},
      {path:'login' , element:<Login saveUserData={saveUserData}/>},
      {path:'movies' , element:<ProtectedRoute userData={userData}><Movies/></ProtectedRoute>},
      {path:'tv' , element:<ProtectedRoute userData={userData}><Tv/></ProtectedRoute>},
      {path:'people' , element:<ProtectedRoute userData={userData}><People/></ProtectedRoute>},
      {path:'itemmovie' , element:<ProtectedRoute userData={userData}><ItemMovie/></ProtectedRoute>},
      {path:'moviedetails/:id/:media_type' , element:<ProtectedRoute userData={userData}><MovieDetails/></ProtectedRoute>},
      {path:'register' , element:<Register/>}
    ]}
  ])

  return <MediaContextProvider>
     <RouterProvider router={routers}/>
  </MediaContextProvider> 

}
export default App;
