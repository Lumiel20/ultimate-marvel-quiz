import React from 'react';
import { FirebaseContext } from '../Firebase'
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';


const Login = (props) => {

    //const { pseudo } = this.props.userData;

    //obtenir les methode de firebase  d'auth
    const firebase = useContext(FirebaseContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [btn, setBtn] = useState('false')
    const [error, setError] = useState('')

    useEffect(() => {
        if (password.length > 5 && email !== "") {
            setBtn(true)
        } else if (btn) {
            setBtn(false)
        }
    }, [password, email, btn])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           await firebase.loginUser(email, password);
            setEmail('') //vidage de mail
            setPassword('')//vidage de mdp
            props.history.push('/welcome')

        } catch (error) {
            setError(error)
            setEmail('') //vidage de mail
            setPassword('') //vidage de mdp
        }
    }

    return (
        <div className='signUpLoginBox'>

            <div className="slContainer">
                <div className="formBoxLeftLogin">
                </div>

                <div className='formBoxRight'>
                    <div className='formContent'>
                        {/*si error different d'une chaine de caractere vide  seulement dans ce cas on retourne*/}
                        {error !== '' && <span>{error.message}</span>}

                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" autoComplete='off' required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" autoComplete='off' required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            {/*si le button initialement false devient true (email et mdp fournie) on affiche le button si na on affiche de button avec disable */}
                            {btn ? <button >Connexion</button> : <button disabled >Connexion</button>}

                        </form>
                        <div className="linkContainer">
                            <Link className='simpleLink' to="/signup">Nouveau sur Marvel Quiz? inscrivez-vous maintenant</Link>
                            <br />
                            <Link className='simpleLink' to="/forgetpassword">Mot de passe oublié? Récupérez-le ici.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;