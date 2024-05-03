import React, { useState, useContext } from 'react';
import { DataContext } from '../data/contexts/dataContext';
import AdminQuestionCard from '../components/AdminQuestionCard';
import QuestionsList from '../components/qustions';
  

const AdminGroupPage = () => {
  const {questions, getQuestionsByGroup} = useContext(DataContext);

  const fetchAsnwers = () => {

  }

  
  return (
    <div className="group-page">
        <QuestionsList/>
    </div>
  );
};

export default AdminGroupPage;


{/* <h2>Group Questions</h2>
        <section className="questions-section">
            <ul className="question-list">
            {questions.map((question, index) => (
                <AdminQuestionCard key={index} question={question} />
            ))}
            </ul>
        </section> */}