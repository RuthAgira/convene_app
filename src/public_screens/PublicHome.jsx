import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link} from 'react-router-dom'
import { AuthContext } from '../authLogic'
import { DataContext } from '../data/contexts/dataContext'
import {db, generateDateTimeLocale, getNextId } from '../data/db'

const PublicHome = () => {
    const selectRef = useRef(null);
    const {user} = useContext(AuthContext)
    const {meetUps, getGroups, createQuestion, questions, getQuestions} = useContext(DataContext)
    const [creatingPost, setCreatingPost] = useState(false)
    const [postData, setPostData] = useState({
        question: '',
        answer: '',
        meetup_id: ''
    })
    

    useEffect(() => {
        getGroups()
        getQuestions()     
    }, [])

    

    const handleClick = (e) => {
        e.preventDefault()
        const selectedGroup = selectRef.current.value;
        setPostData({...postData, meetup_id: selectedGroup})
    };

    const handleCreatePost = (e) => {
        e.preventDefault()
        const post = {
            post_id: getNextId(),
            user_id: user.id,
            meetup_id: postData.meetup_id,
            question: postData.question,
            answer: postData.answer,
            date_created: generateDateTimeLocale(),
            votes: 0       
        }
        console.log('new post', post)
        createQuestion(post)
    }
    
  return (

    <div className='public-home-container' style={{minHeight: '100vh'}}>
        <div className="public-sidebar">
            <div className="title">
                <h4>Hello: {user?.name}</h4>
            </div>
            <div className="side-bar-menu">
                <Link className='public-sidebar-link' to={'#'} >My Articles</Link>
                <Link className='public-sidebar-link' to={'#'} >Library</Link>
                <Link className='public-sidebar-link' to={'#'} >Settings</Link>
            </div>
        </div>
        <div className="public-body">
            <div className="new-question">
                {
                    creatingPost? (
                        <div className="new-question-form">
                            <form className="new-question-form-input" onSubmit={(e)=>handleCreatePost(e)}>
                                <textarea name="" id="" cols="35" rows="3" onChange={(e)=>setPostData({...postData, question: e.target.value})}></textarea>
                                <div className="selecting-group">
                                    <select ref={selectRef}  onChange={(e)=>handleClick(e)}>
                                    <option >Choose Group to post on from Below</option>
                                        {
                                            meetUps.map((meetUp, index) => (
                                                <option key={index} value={meetUp.meetup_id}>{meetUp.title}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="actions">
                                    <button id='cancel-button' onClick={()=>setCreatingPost(false)}>Cancel</button>
                                    <button id='submit-button' type="submit" onClick={(e)=>{handleCreatePost(e)}}>Submit</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <button className="new-question-btn" onClick={()=>setCreatingPost(true)}>Create a new question</button>
                        )
                }
                <div className="question-input-area">  
                </div>
            </div>
                   
            <div className="top-questions" style={{maxHeight: '500px', overflowY: 'auto'}}>
                {
                    questions.sort((qA, qB)=>qB.votes-qA.votes)
                    .map((question, index)=>(
                        <div className="qustion-card" key={question.post_id+''+index}>
                            <PublicQuestionCard question={question}/>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="right-bar">
            <div className="groups">
                {
                    meetUps.map((group)=>(
                        <div className="group-card" key={group.meetup_id}>
                            <div className="group-icon"></div>
                            <div className="group-name">{group.title}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
    )
    
}

export default PublicHome






export const PublicQuestionCard = ({question}) => {
    const {meetUps} = useContext(DataContext)    
    const [addingComment, setAddingComment] = useState(false)
    const [comment, setComment] = useState('')
    const [todisplayComment, setToDisplayComment] = useState({
        displaying: false,
        comments: []
    })

    const upVoteQuestion = (question)=>{
        const qUpdate = {...question, votes: ++question.votes}
        db.postTbl.UPDATE_POST(qUpdate)
     }


    const hanldePostComment = (post_id, user_id)=>{
        if(comment === '') return
        db.commentTbl.CREATE_COMMENT({
            comment_id: getNextId(),
            user_id: user_id,
            post_id: post_id,
            comment: comment,
            date_created: generateDateTimeLocale()
        })
    }

    const gp =(id)=> {
        const x = meetUps.find(g => g.meetup_id === id);
        return x.title;
    }

    const handleDisplayComments = (post_id)=>{
        if(todisplayComment.displaying === true){
            setToDisplayComment({comments: [], displaying: false})
            return;
        }

        const fetchedComments = db.commentTbl.GET_COMMENTS_BY_POST(post_id)
        if(fetchedComments.length > 0){
            setToDisplayComment({comments: fetchedComments, displaying: true})
        }
    
    }


  return (
    <>
        <div className="qustion-info">
            <div className="question-posted-in">
                <span>Posted In: <i>{gp(question.meetup_id)}</i></span>
            </div>
            <div className="qustion-author">
                <div className="question-author-avator"></div>
            </div>
            <div className="question-content" style={{textAlign: 'left'}}>
                <h3>{question.question}</h3>
                {
                    question.answer && (
                    <div className="question-answer-container" style={{width: '100%', borderBottom: '1px solid gray', borderRadius: '5px', padding: '5px', marginBottom: '10px'}}>
                        Answer: <p className="question-answer">{question.answer}</p>
                    </div>
                    )
                }
            </div>
        </div>

        <div className="question-extras">
            <div className="reaction-to-question" style={{cursor: 'pointer', display: 'flex', flexDirection: 'row', gap: '10px'}} >
                <button className="upvote-question" onClick={()=>upVoteQuestion(question)}>Upvote </button>
                <button className="comment-on-question" 
                onClick={()=>setAddingComment(true)}
               
                >Add Comment</button>
                <button 
                onClick={()=>handleDisplayComments(question.post_id)}
                >
                    {todisplayComment.displaying?'Hide Comments':'Show Comments' }
                </button>
            </div>
            <div className="qustion-votes" style={{fontSize: 'small'}}>
                {question.votes} Votes
            </div>
        </div>
        {
            addingComment &&(
                <div className="add-comment-input"
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}
                >
                    <textarea value={comment} name="" id="" cols="30" rows="3" onChange={(e)=>setComment(e.target.value)}></textarea>
                    <button
                    onClick={()=>{
                        hanldePostComment(question.post_id, question.user_id)
                        setAddingComment(false)
                    }}  
                    >Comment</button>
                </div>
            )
        }
            
        {
            (todisplayComment.displaying&&todisplayComment.comments.length !==0)&&(
                <>
                <u><h4>Comments</h4></u>
                {
                    <div className=""style={{
                                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'justify', gap: '10px'
                                }} >
                        {
                           todisplayComment.comments.map((cmt, index)=>(
                            <div className="" key={cmt.comment_id}
                                 
                            >
                                <small>{cmt.comment}</small>
                            </div>
                            )) 
                        }
                    </div>
                    
                }
                </>
            )
        }
    </>
  )
}
