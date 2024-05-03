import React, {useContext, useEffect} from 'react'
import { DataContext } from '../data/contexts/dataContext'
import AdminQuestionCard from './AdminQuestionCard';

const QuestionsList = () => {
  const {questions, getQuestions} = useContext(DataContext)

  useEffect(() => {
    getQuestions()    
  }, [])
  
    return (
      <div className="question-list">
        {(
          questions.sort((qA, qB)=>qB.votes-qA.votes)
        ).map((question, index) => (
          <div key={question.post_id+''+index} className="question-item">
            <AdminQuestionCard 
            question={question}
            />
          </div>
        ))}
      </div>
    );
  };

export default QuestionsList