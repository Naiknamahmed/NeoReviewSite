import React, {useState} from 'react';
import VideoFolders from './VideoFolders/VideoFolders';
import VideoPlayer from './VideoPlayer/VideoPlayer';

const Video = (props) => {
  const [url,setUrl]=useState('');

  const updateUrl = (val) => {
    setUrl(val);
  }

  return (
    <div className='flex flex-col justify-center items-center'>
        <VideoPlayer url={url}/>
        <VideoFolders updateUrl={updateUrl}/>
    </div>
  )
}

export default Video
