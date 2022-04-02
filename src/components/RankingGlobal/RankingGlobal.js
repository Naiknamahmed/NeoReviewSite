import React from 'react';
import { getLocalUserdata } from '../../services/auth/localStorageData';
import './styles.css'

const RankingGlobal = () => {
  const data=getLocalUserdata();
  
  return (
    <div className='flex justify-center items-center'>
      
            <iframe src={`https://neoestudio.net/googleChartPoint?studentId=${data.id}`} title="Ranking Global" style={{height:'100vh', width:'100vw'}}></iframe>
 
    </div>
  )
}

export default RankingGlobal
