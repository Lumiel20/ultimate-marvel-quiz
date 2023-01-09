import React, { Fragment, useEffect, useState } from 'react';
import { GiDiamondTrophy } from 'react-icons/gi'
import { BsFillEmojiLaughingFill } from 'react-icons/bs'
import Modal from '../Modal/Modal';

//import axios from 'axios '


const QuizOver = React.forwardRef((props, ref) => {

    //console.log(props);
    //console.log(ref);
    const {
        LevelNames,
        score,
        maxQuestions,
        quizLevel,
        percent,
        loadLevelQuestion } = props


    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
    console.log(API_PUBLIC_KEY);
    //const hash = 'f5ec72b7722a076202c4b223eda5e65b'



    const [asked, setAsked] = useState([]);
    //console.log(asked);
    const [openModal, setOpenModal] = useState(false);


    useEffect(() => {
        setAsked(ref.current);
    }, [ref])

    const showModal = (id) => {
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }



    //averageGrade calcul du score moyenne
    const averageGrade = (maxQuestions / 2) + 1

    if (score < averageGrade) {

        //setTimeout(() => { loadLevelQuestion(0)}, 3000);
        setTimeout(() => { loadLevelQuestion(quizLevel) }, 4000);
    }
    const decision = score >= averageGrade ?

        (
            <Fragment>
                <div className='stepsBtnContainer'>
                    {
                        quizLevel < LevelNames.length ?
                            (
                                <Fragment >
                                    <p className='successMsg'>Passer au niveau suivant! </p>
                                    <button className='btnResult success'
                                        onClick={() => loadLevelQuestion(quizLevel)}
                                    >   Niveau Suivant

                                    </button>
                                </Fragment>
                            )
                            :
                            (
                                <Fragment>
                                    <p className='successMsg'>

                                        < GiDiamondTrophy size='50px' color='blue' />  Félicitation vous êtes un Marvel !
                                    </p>
                                    <button className='btnResult gameOver'
                                        onClick={() => loadLevelQuestion(0)}
                                    >  Acceuil
                                    </button>
                                </Fragment>
                            )
                    }
                </div>

                <div className='percentage'>
                    <div className='progressPercent'>Réussite: {percent}%</div>
                    <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
                </div>

            </Fragment>

        )
        :
        (
            <Fragment>
                <div className='stepsBtnContainer'>
                    <p className='failureMsg'>  < BsFillEmojiLaughingFill color='yellow' size='30px' />
                        < BsFillEmojiLaughingFill color='yellow' size='30px' />
                        < BsFillEmojiLaughingFill color='yellow' size='30px' />
                        vous avez échoué ha ha ha ha  ! réessayer </p>

                </div>

                <div className='percentage'>
                    <div className='progressPercent'>Réussite: {percent}%</div>
                    <div className='progressPercent'>Note: {score}/{maxQuestions}</div>
                </div>
            </Fragment>
        )

    const quizAnswers = score >= averageGrade ?
        (
            asked.map((quiz) => {
                return (
                    <tr key={quiz.id}>
                        <td>{quiz.question}</td>
                        <td>{quiz.answer}</td>
                        <td>
                            <button className='btnInfo'
                                onClick={() => showModal(quiz.heroId)}
                            >infos</button>
                        </td>
                    </tr>
                )
            })

        )
        :
        (
            <tr>
                <td colSpan={3}>
                    <div className='loader'></div>
                    <p style={{
                        textAlign: 'center',
                        color: 'red'
                    }}> pas de réponse</p>
                </td>
            </tr>
        )

    return (

        <Fragment>
            
            {decision}

            <hr />
            <p>Les réponse au questions posées: </p>

            <div className="answerContainer">

                <table className='answers'>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponse</th>
                            <th>Infos</th>
                        </tr>
                    </thead>

                    <tbody>
                        {quizAnswers}
                    </tbody>

                </table>
            </div>
            <Modal openModal={openModal} closeModal={closeModal}>
                <div className='modalHeader'>
                    <h2>Titre</h2>
                </div>
                <div className="modalBody">
                    Coming soon ...
                </div>
                <div className="modalFooter">
                    <button className='modalBtn'>Fermer</button>
                </div>
            </Modal>
        </Fragment>

    );
});

export default React.memo(QuizOver);