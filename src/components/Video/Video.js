import React from 'react';
import VideoFolders from './VideoFolders/VideoFolders';
import VideoPlayer from './VideoPlayer/VideoPlayer';

const Video = (props) => {
  return (
    <div className='flex flex-col justify-center items-center' style={{}}>
        <VideoPlayer />
        <VideoFolders/>
    </div>
  )
}

export default Video
