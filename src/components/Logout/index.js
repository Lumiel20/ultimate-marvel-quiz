import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../Firebase'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';

const Logout = () => {

    const firebase = useContext(FirebaseContext)

    const [checked, setChecked] = useState(false)
    //console.log(checked);

    useEffect(() => {
        //si checked is true dans ce cas effectuer la deconnection
        if (checked) {
            //console.log('deconnexion');
            firebase.signOutUser()
        }
    }, [checked, firebase])

    const handleChange = (event) => {
        setChecked(event.target.checked);
    }

    return (
        <div className='logoutContainer'>
            <label className='switch'>
                <input
                    onChange={handleChange}
                    type="checkbox"
                    checked={checked}

                />
                <span className='slider round' data-tooltip-content="Deconnection" id="attributes-basic" data-tooltip-place="left"></span>
            </label>
            <Tooltip anchorId="attributes-basic" />
        </div>
    );
};

export default Logout;