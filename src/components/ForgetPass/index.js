import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase'


const ForgetPassword = (props) => {

    const firebase = useContext(FirebaseContext)

    const [email, setEmail] = useState('');
    const [success, setsuccess] = useState(null);
    const [error, setError] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault()

        firebase.passwordReset(email)
            .then(() => {
                setError(null)
                setsuccess(`Consultez votre email ${email} pour changer le mot de passe`)
                setEmail('');

                setTimeout(() => {
                    props.history.push('/login')
                }, 5000);
            })
            .catch(error => {
                setError(error);
                setsuccess('');
            })
    }
    const succes = success && <span style={{
        border: '1px solid green',
        background: 'green',
        color: '#ffffff'
    }}> {success}
    </span >


    // si email est une chaine de caractere vide
    const disabled = email === '';

    return (

        <div className='signUpLoginBox'>
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>

                <div className='formBoxRight'>
                    <div className='formContent'>

                      {/*si success est egal vrai on affiche le span*/}
                        {/*{success && <span style={{
                            border: '1px solid green',
                            background: 'green',
                            color: '#ffffff'
                        }}> {success}
                        </span >} */} 
                         {succes}
                        {error && <span>{error.message}</span>}

                        <h2>Mot de passe oublié ?</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" autoComplete='off' required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Récupérer</button>

                        </form>
                        <div className="linkContainer">
                            <Link className='simpleLink' to="/login">Déjà inscrit ? Connectez-vous</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ForgetPassword;