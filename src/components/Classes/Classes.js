import React, {useState} from 'react';
import ClassesPlayer from './ClassesPlayer/ClassesPlayer.js';
import ClassesFolder from './ClassesFolder/ClassesFolder.js';

const Classes = (props) => {
  const [url,setUrl]=useState('');
  const updateUrl = (val) => {
    setUrl(val);
  }

  return (
    <div className='flex justify-center items-center'>
      <ClassesFolder folderToggle={props.folderToggle} updateUrl={updateUrl}/>
      <ClassesPlayer url={url}/>
    </div>
  )
}

export default Classes
