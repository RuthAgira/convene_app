import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../data/contexts/dataContext'

const Groups = () => {


  const {meetUps, getGroups} = useContext(DataContext)

  useEffect(() => {
    getGroups()
  }, [])


  return (
    <>
    {
          meetUps.map((group) => (
          <div className='sidebar-item' key={group.meetup_id}>
            <Link to={`/Admin/${group.meetup_id}`} style={{textDecoration: 'none', color: 'black', fontWeight: "bold", borderBottom: 'solid 1px black', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
              {group.title}
            </Link>
            <div className='sidebar-item-extra'>
              <div className='no-of-members' style={{fontSize: '11px', color: 'green'}}>Since: {group.date_created}</div>
              <div className='actions' style={{color: 'red', fontSize: 'small', cursor: 'pointer'}}>Delete</div>
            </div>
          </div> 
          ))
        }
    </>
  )
}

export default Groups