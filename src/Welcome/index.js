import React, { Fragment, useState, useContext, useEffect } from 'react';
import Logout from '../components/Logout';
import Quiz from '../components/Quiz';
import { FirebaseContext } from '../components/Firebase'


const Welcome = (props) => {

    const firebase = useContext(FirebaseContext)

    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState(null)

    //si userSession est null on affiche le composant avec la class(loader) si na affiche le composant avec la class(quiz-bg)

    useEffect(() => {
        //onAuthStateChanged verifie si le user est connecter ou deconnecter
        /* on verifie d'abord si l'utilisateur est authentifier si c'est le cas, nous allons avoir les valeurs de l'utilisateur
             si c'est le cas nous allons avoir les valeur du user que nous allons mettre dans  userSession 
             si na on le faire sortie rediriger vers la page d'acceuil*/
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');
        })

        if (userSession !== null) {
            firebase.fetchUserData()
                .then((user) => {

                    console.log(".....fetched user....", user)
                    setUserData(user)
                })
        }

        return () => {
            //arreter le listener
            listener()
        };
    }, [firebase.auth, props.history, userSession, firebase])

    //const quiz = userSession === null ? (<div className='loader'><p>loading ...</p></div>) : <Quiz userData={userData} />

    const quiz = userData === null ? (<div><div className='loader'></div><p className='center'>Loading ...</p></div>) : <Quiz userData={userData} />

    return (
        <Fragment>

            <div className='quiz-bg'>
                <div className='container'>
                    <Logout />
                    {quiz}
                </div>
            </div>
        </Fragment>

    );
};

export default Welcome;