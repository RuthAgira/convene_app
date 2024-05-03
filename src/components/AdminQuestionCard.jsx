import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../data/contexts/dataContext'
import { db } from '../data/db'

const AdminQuestionCard = ({question}) => {
    const [authers, setAuthors] = useState([])
    const {meetUps} = useContext(DataContext)
    const [answeringQuestion, setAnsweringQuestion] = useState({
        answering: false,
        questionText: ''
    })

    useEffect(()=>{
        const au = db.userTbl.GET_ALL_USERS()
        setAuthors(au)
    }, [])


    const gp =(id)=> {
        const x = meetUps.find(g => g.meetup_id === id);
        return x.title;
    }
    
    const otName = (id)=>{
      console.log('Author Id is', id)
      const nm=authers?.find(x=>x.id === id)
      if(nm) return nm.name
      return 'Unknown'
    }

    const handleAnsweringStatus = ()=>{
        if(answeringQuestion.answering === true){
            setAnsweringQuestion((status)=>({...status, answering: false}))
        }
        else setAnsweringQuestion((status)=>({...status, answering: true}))
    }

    const handleAnswer = (e)=>{
        e.preventDefault()
        const q = {
           ...question,
            answer: answeringQuestion.questionText
        }
        db.postTbl.UPDATE_POST(q)
        setAnsweringQuestion((status)=>({...status, answering: false}))
    }
 

  return (
    <>
        <div className="question-author-container">
        Posted in: <small className="group" style={{color: 'gray'}}> {gp(question.meetup_id)}</small>
        </div>
        <div className="" style={{textAlign: 'left'}}>
          <h3 className="question-question" >{question.question}</h3>
          {
            question.answer && (
              <div className="question-answer-container" style={{width: '100%', borderBottom: '1px solid gray', borderRadius: '5px', padding: '5px', marginBottom: '10px'}}>
                Answer: <p className="question-answer">{question.answer}</p>
              </div>
            )
          }
        </div>
        <div className="question-details">
          <div className="details">
            <span className="posted-by">Posted by: {otName(question.user_id)}</span>
            <span className="votes">Votes: {question.votes}</span>
          </div>
          <div className="answer-input" style={{border: 'solid white 1px', borderRadius: '5px', color: 'white', padding: '5px', cursor: 'pointer'}}
          onClick={()=> handleAnsweringStatus()}
          >
            {
                answeringQuestion.answering? 'Dont Answer': 'Answer Question'
            }
            
          </div>
        </div>
        {
          answeringQuestion.answering && (
            <div className="answer-input-container"
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', marginTop: '20px', padding: '5px'}}
            >
                <textarea
                className="answer-input-text"
                placeholder="Enter your answer here"
                onChange={(e)=>setAnsweringQuestion((status)=>({...status, questionText: e.target.value}))}
                ></textarea>
                <button className="answer-input-button" onClick={(e)=> handleAnswer(e)}
                style={{padding: '5px', backgroundColor: 'green', color: 'white', borderRadius: '5px', margin: '20px 0px', border: 'solid 1px white'}}
                >Submit</button>
            </div>
          )
        }
    </>
  )
}

export default AdminQuestionCard