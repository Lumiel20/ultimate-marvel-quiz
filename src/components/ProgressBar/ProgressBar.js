 import React from 'react';
import { Fragment } from 'react';

const ProgressBar = ({idQuestion, maxQuestions}) => {
   //console.log(idQuestion, maxQuestions) props; 


   // function calculant le poucentage des question
   const getPercentage = (totalQuestions, questionId) =>{
    return (100 / totalQuestions) * questionId
   }

   const actualQuestion = idQuestion + 1
   const progressPercent = getPercentage(maxQuestions, actualQuestion)
   //console.log(progressPercent);

    return (
        <Fragment>
            <div className='percentage'>
                <div className='progressPercent'>{`Question: ${idQuestion + 1}/${maxQuestions}`}</div>
                <div className='progressPercent'>{`Progression: ${progressPercent}%`}</div>
            </div>
            
            <div className='progressBar'>
              <div className='progressBarChange' style={{width: `${progressPercent}%`}}></div></div>
        </Fragment>


    );
};

export default React.memo(ProgressBar);