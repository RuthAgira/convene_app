import React, {createContext, useState} from 'react'
import { db } from '../db'

const DataContext = createContext({
    meetUps: [],
    getGroups: () => {},
    questions: [],
    getQuestions: () => {},
    createGroups: () => {},
    createQuestion: () => {},
    users: [],
    getQuestionsByGroup: (groupId) => {},
    getQuestionWithAnswer: (question_id)=>{}
})

const DataContextProvider = ({children}) => {
    const [meetUps, setMeetUps] = useState([])
    const [questions, setQuestions] = useState([])
    const [users, setUsers] = useState([])

    const getGroups = () => {
        const data = db.meetUpTbl.GET_ALL_MEETUPS()
        setMeetUps(data)
    }

    const createGroups = (data) => {
        db.meetUpTbl.CREATE_MEETUP(data)
        getGroups()
    }

    const getQuestions = () => {
        const data = db.postTbl.GET_ALL_POSTS()
        setQuestions(data)
        console.log('fetched all questions')
    }

    const getQuestionWithAnswer = (question_id)=>{
        const q = db.postTbl.GET_POST(question_id)
        const a = db.answerTbl.GET_ANSWER(question_id)
        console.log(q)
        console.log(a)
    }

        
    const getQuestionsByGroup = (id) => {
        const data = db.postTbl.GET_ALL_POSTS().filter(post => post.meetup_id === id)
        console.log('Posts fetched successfully:', data);
        
        setQuestions(data);
      };
      

    const getUsers = () => {
        const data = db.userTbl.GET_ALL_USERS()
        setUsers(data)
    }

    const createQuestion = (data) => {
        db.postTbl.CREATE_POST(data)
        getQuestions()
    }

    const value = {
        meetUps,
        getGroups,
        questions,
        getQuestions,
        createGroups,
        createQuestion,
        getQuestionsByGroup,
        getQuestionWithAnswer,
        users
    }
  return (
    <DataContext.Provider value={value}>
        {children}
    </DataContext.Provider>
  )
}

export {DataContextProvider, DataContext}