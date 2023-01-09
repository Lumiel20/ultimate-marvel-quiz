
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase'


const Signup = (props) => {
    //console.log(props);

    //declaration de useContext
    const firebase = useContext(FirebaseContext)
    //console.log(firebase, 'fff');

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [loginData, setLoginData] = useState(data)
    const [error, setError] = useState('')
    //console.log(loginData);

    const handleChange = (e) => {
        // capturer les elements de logindata 
        setLoginData({ ...loginData, [e.target.id]: e.target.value })
    }

    //methode de validation du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); //eviter que la page se raffraichisse
         //const { email, password, pseudo } = loginData;
         
        try {
            await firebase.signupUser(loginData)
            //vider login data si les actions sont bien mené
            setLoginData({ ...data })
            props.history.push('/welcome')
        } catch (error) {
            setLoginData({ ...data })
            setError(error);
        }
    }

    //Destructuration pour eviter d'afficher l'objet loginData dans chaque value
    const { pseudo, email, password, confirmPassword } = loginData;

    /* si le pseudo = une chaine de caractere vide pareil pour (email, password) et password different de confirmPassword
    dans ce cas afficher le button inscription avec disable sinon afficher le bouton normal */
    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
        ? <button disabled>SignUp</button> : <button>SignUp</button>

    //gestion des erreur

    /*l'erreur est different d'une chaine de caractère vide
   seulement dans ce cas tu affiche un message d'erreur*/
    const errorMsg = error !== '' && <span>{error.message}</span>
    //console.log(errorMesg);

    return (
        <div className='signUpLoginBox'>
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>

                <div className='formBoxRight'>
                    <div className='formContent'>
                        {errorMsg}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={handleChange} value={pseudo} type="text" id='pseudo' autoComplete='off' required />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={email} type="email" id='email' autoComplete='off' required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={password} type="password" id='password' autoComplete='off' required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={confirmPassword} type="password" id='confirmPassword' autoComplete='off' required />
                                <label htmlFor="confirmPassword">Confirmer votre mot de passe</label>
                            </div>
                            {btn}
                        </form>
                        <div className="linkContainer">
                            <Link className='simpleLink' to="/login">Deja inscrit? Connectez-vous </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;