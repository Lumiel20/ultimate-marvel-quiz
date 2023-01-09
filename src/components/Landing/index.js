//import React from 'react';
import { useRef, useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {

    //creation du variable d'etat hook (useState)
    const [btn, setBtn] = useState(false)
    console.log(btn, '....');

    const refWolverine = useRef(null)

    //creation du variable d'etat hook (useEffet)
    useEffect(() => {

        //classe affichant les griffes de wolverine
        refWolverine.current.classList.add('startingImg')
        setTimeout(() => {
            refWolverine.current.classList.remove('startingImg')

            //affichage des boutons
            setBtn(true)
        }, 1000);

    }, [])


    const setLeftImg = () => {
        refWolverine.current.classList.add('leftImg')
        // console.log(setLeftImg());
    }

    const setRightImg = () => {
        refWolverine.current.classList.add('rightImg')
        //console.log(setRightImg());
    }

    const clearImg = () => {
        if (refWolverine.current.classList.contains('leftImg')) {
            refWolverine.current.classList.remove('leftImg')

        } else if (refWolverine.current.classList.contains('rightImg')) {
            refWolverine.current.classList.remove('rightImg')
        }

    }

    const displayBtn = btn && (
        <Fragment>
            <div className="leftBox">
                <Link onMouseOver={setLeftImg} className='btn-welcome' onMouseOut={clearImg} to='/signup' >Inscription</Link>
            </div> 

            <div className="rightBox">
                <Link onMouseOver={setRightImg} className='btn-welcome' onMouseOut={clearImg} to='/login'>Connexion</Link>
            </div>
        </Fragment>

    )

    return (
        <main ref={refWolverine} className='welcomePage'>
            {displayBtn}
        </main>
    );
};

export default Landing; 