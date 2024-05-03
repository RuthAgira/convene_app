import React, {useState, useContext} from 'react'
import QuestionsList from '../../../OneDrive/Desktop/react_convene_app/src/components/qustions';
import Groups from '../../../OneDrive/Desktop/react_convene_app/src/components/groups';
import '../styles/adminStyles.css'
import { generateDateTimeLocale, getNextId, db } from '../../../OneDrive/Desktop/react_convene_app/src/data/db';
import { DataContext } from '../../../OneDrive/Desktop/react_convene_app/src/data/contexts/dataContext';

const AdminHome = () => {
  return (
    <div className='app-body'>
        <AppSideBar/>
        <BodyContets/>
    </div>
  )
}

export default AdminHome



const AppSideBar = () => {
    return (
      <div className='sidebar'>
        <div className='sidebar-title'>
          Meetups
        </div>
        <div className='sidebar-items'>
          <Groups/>
        </div>
      </div>
    )
  }
  
  
  
  const BodyContets = () => {
    const [isAddingMeetUp, setIsAddingMeetUp] = useState(false)
    const {createGroups} = useContext(DataContext)
    const [meetUpData, setMeetUpData] = useState({
      title: '',
      description: '',
    })

    const handleCreateMeetUp = (e) => {
      e.preventDefault()
      if(meetUpData.title === '' || meetUpData.description === '') return;
      const meetUp = {
        title: meetUpData.title,
        description: meetUpData.description,
        date_created: generateDateTimeLocale(),
        meetup_id: getNextId(),
      }

      createGroups(meetUp)
      setIsAddingMeetUp(false)
      console.log(meetUp)
    }

    return (
      <div style={{width: '100%'}}>
        <div className='first-section'>
          {
            isAddingMeetUp? (
              <div className='add-meetup-form'>
                <form className='add-meetup-form-input'>
                  <input type="text" name="title" id="" placeholder='Title' onChange={(e)=>setMeetUpData({...meetUpData, title: e.target.value})} />
                  <textarea name="description" id="" placeholder='Description' onChange={(e)=>setMeetUpData({...meetUpData, description: e.target.value})}></textarea>
                </form>
                <div className='actions'>
                  <button id='cancel-button' onClick={()=>setIsAddingMeetUp(false)}>Cancel</button>
                  <button id='submit-button' onClick={(e)=>handleCreateMeetUp(e)} type='submit'>Submit</button>
                </div>
              </div>
              ):
              (
                <div className='add-meetup-button' onClick={()=>setIsAddingMeetUp(true)}>
                   Add Meetup <div className="plus-icon">+</div>
                </div>
              )
           }
        </div>
        <div style={{width: '100%', borderBottom: '1px solid white'}}></div>
        <div className='second-section'>
          <QuestionsList/>
        </div>
      </div>
    )
  } 