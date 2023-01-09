
import React, {useEffect, useState} from 'react';
import Stepper from 'react-stepper-horizontal/lib/Stepper';

const Levels = (props) => {
    const{LevelNames, quizLevel} = props

    const [levels, setLevels] = useState([])


    useEffect(() =>{

     const quiSteps = LevelNames.map((level) => ({
            title: level.toUpperCase()
        }))
          setLevels(quiSteps)

    }, [LevelNames]);
    
    return (
        <div className='levelsContainer' style={{background: 'transparent'}}>  
                <Stepper steps={levels}   
                activeStep={quizLevel}
                circleTop={0} 
                //activeTitleColor={'#EB1D27'}
                //activeColor={'#EB1D27'}
                completeTitleColor={'#E0E0E0'}
                defaultTitleColor={'#E0E0E0'}
                completeColor={'#E0E0E0'}
                completeBarColor={'#E0E0E0'}
                size={45}
                circleFontSize={20}

                 />
        </div>
    );
}; 

export default React.memo(Levels);