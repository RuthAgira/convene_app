import React from 'react'
import { Outlet } from'react-router-dom'
import { DataContextProvider } from '../data/contexts/dataContext'

const AdminLayout = () => {
  return (
    <DataContextProvider>
    <div className='navbar'>
      <div className="navbar-right">
        <div className='app-name' style={{fontSize: '30px'}}>Convene</div>
      </div>
      <div className="navbar-left">
        <div className='logout' style={{fontSize: '20px'}}>
          Logout
        </div>
      </div>
    </div>
      <Outlet/>
    </DataContextProvider>
  )
}

export default AdminLayout