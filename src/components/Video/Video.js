import React, {useState} from 'react';
import VideoFolders from './VideoFolders/VideoFolders';
import VideoPlayer from './VideoPlayer/VideoPlayer';

const Video = (props) => {
  const [url,setUrl]=useState('');
  const [title,setTitle]=useState('');
  
  const updateUrl = (val,title) => {
    setUrl(val);
    setTitle(title);
  }

  return (
    <div className='flex justify-center items-center'>
        <VideoFolders folderToggle={props.folderToggle} updateUrl={updateUrl}/>
        <VideoPlayer url={url} title={title}/>
    </div>
  )
}

export default Video
