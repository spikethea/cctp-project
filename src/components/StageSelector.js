import React, { useState, useEffect } from 'react';
//Redux
import {useSelector} from 'react-redux';

//Stages
import Overworld from './stages/Overworld';
import HealthAndSafety from './stages/HealthAndSafety';
import Allergies from './stages/Allergies';


const StageSelector = () => {

    const currentStage = useSelector(state => state.info.activeStage);

    const stageSelect = currentStage.id

    console.log(stageSelect);

    const [stageLoad, setStageLoad] = useState(false);

    //useEffect(()=>setStageLoad(true), [currentStage])

    
      if (stageSelect === 0) {
            return (
              <HealthAndSafety/>
            
          )} 
        else if (stageSelect === 1) {
            return (
            <Allergies/>
        )
      }
     else return (
      <Overworld/>
      )
    

    
}

export default StageSelector