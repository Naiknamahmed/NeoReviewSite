import React, {useRef, useState} from 'react';
import { updateLocalStorageTimeStamp, getTimeStamp} from '../../../services/auth/localStorageData';
import './styles.css';

const VideoPlayer = (props) => {
  const videoRef = useRef();
  const [duration, setDuration]=useState(0);

  const onProgress = (data) => {
    setDuration(videoRef.current.currentTime);
    updateLocalStorageTimeStamp('openedVideos',props.title,duration);
  }

  return (
    <div className='div1'>
            <div className='div2'>
                <video className='check' 
                    width="750" 
                    height="500" 
                    controls 
                    autoPlay 
                    muted 
                    ref={videoRef} 
                    controlsList="nodownload" 
                    onProgress={onProgress}
                    onLoadStart={() => {
                      const timeToStart = getTimeStamp('openedVideos',props.title);
                      videoRef.current.currentTime=timeToStart;
                      }}
                    onContextMenu={e => e.preventDefault()}>
                    <source src={props.url} type="video/mp4"/>
                    Your browser doesn't support video, Choose a better browser!
                </video>
            </div>
    </div> 
  )
}

export default VideoPlayer
