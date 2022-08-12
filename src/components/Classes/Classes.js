import React, {useState} from 'react';
import ClassesPlayer from './ClassesPlayer/ClassesPlayer.js';
import ClassesFolder from './ClassesFolder/ClassesFolder.js';

const Classes = (props) => {
  const [url,setUrl]=useState('');
  const [title,setTitle]=useState('');

  const updateUrl = (val,title) => {
    setUrl(val);
    setTitle(title);
  }

  return (
    <div className='flex '>
      <ClassesFolder folderToggle={props.folderToggle} updateUrl={updateUrl}/>
      <ClassesPlayer url={url} title={title}/>
    </div>
  )
}

export default Classes
