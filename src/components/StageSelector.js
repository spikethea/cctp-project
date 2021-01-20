import React, { useState} from 'react';
//Redux
import {useSelector} from 'react-redux';

//Stages
import Overworld from './stages/Overworld';
import HealthAndSafety from './stages/HealthAndSafety';
import Allergies from './stages/Allergies';


const StageSelector = () => {

    const currentStage = useSelector(state => state.info.activeStage);

    console.log(currentStage);
    //useEffect(()=>setStageLoad(true), [currentStage])

    switch(currentStage) {
      case 0:
        console.log(currentStage);
        return (
          <Overworld/>
          )
      case 1:
        console.log(currentStage);
        return (
              <HealthAndSafety/>
            
          )
      case 2:
        return (
              <Allergies/>
            
          )
      default:
        return (
          <Overworld/>
          )
    }
    
}

export default StageSelector