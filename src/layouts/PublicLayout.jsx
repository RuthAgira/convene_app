import React,{useContext, useEffect} from 'react'
import { Outlet, useNavigate } from'react-router-dom'
import '../styles/publicStyles.css'
import { AuthContext } from '../authLogic'
import { initializeDB } from '../data/db'
import { DataContextProvider } from '../data/contexts/dataContext'

const PublicLayout = () => {

  
    const navigate = useNavigate();
    const {isLoggedIn } = useContext(AuthContext);    

    useEffect(()=>{
      console.log('isLoggedIn',isLoggedIn)
      if(isLoggedIn===false){
            return navigate('/auth')
        }
        initializeDB()
    },[isLoggedIn])


  return (
    <DataContextProvider>
    <div className='navbar'>
      <div className="navbar-right">
        <div className='app-name' style={{fontSize: '30px'}}>Convene</div>
      </div>
      <div className="navbar-left">
        <div className='logout' style={{fontSize: '20px', cursor: 'pointer'}} onClick={()=>navigate('/auth')}>
          Logout
        </div>
      </div>
    </div>
    <Outlet/>
    </DataContextProvider>
    )
    
}

export default PublicLayout