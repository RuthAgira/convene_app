import React, { useContext, useEffect } from 'react'
import { DataContext } from '../data/contexts/dataContext'
import { useParams } from 'react-router-dom'

const AdminViewQUestion = () => {
    

    const {id} = useParams()
    const {getQuestionWithAnswer} = useContext(DataContext)
    useEffect(()=>{
        getQuestionWithAnswer(id)
    }, [])

    
  return (
    <div>AdminViewQUestion</div>
  )
}

export default AdminViewQUestion