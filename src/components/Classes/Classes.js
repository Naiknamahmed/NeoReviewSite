import React, {useState} from 'react';
import ClassesPlayer from './ClassesPlayer/ClassesPlayer.js';
import ClassesFolder from './ClassesFolder/ClassesFolder.js';

const Classes = () => {
  const [url,setUrl]=useState('');
  const updateUrl = (val) => {
    setUrl(val);
  }

  return (
    <div className='flex flex-col justify-center items-center'>
        <ClassesPlayer url={url}/>
        <ClassesFolder updateUrl={updateUrl}/>
    </div>
  )
}

export default Classes
