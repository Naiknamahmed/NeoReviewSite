import React, {useState} from 'react';
import VideoFolders from './VideoFolders/VideoFolders';
import VideoPlayer from './VideoPlayer/VideoPlayer';

const Video = (props) => {
  const [url,setUrl]=useState('');

  const updateUrl = (val) => {
    setUrl(val);
  }

  return (
    <div className='flex justify-center items-center'>
        <VideoFolders folderToggle={props.folderToggle} updateUrl={updateUrl}/>
        <VideoPlayer url={url}/>
    </div>
  )
}

export default Video
