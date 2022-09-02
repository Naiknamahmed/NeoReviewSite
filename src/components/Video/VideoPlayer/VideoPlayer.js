import React, {useRef, useState, useEffect} from 'react';
import { updateLocalStorageTimeStamp, getTimeStamp} from '../../../services/auth/localStorageData';
import './styles.css';

const VideoPlayer = (props) => {
  const videoRef = useRef();
  const [duration, setDuration]=useState(0);

  useEffect(() => {
    videoRef.current?.load();
  }, [props.url]);


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
                    onPlay={() => {
                      if(videoRef.current?.videoWidth + videoRef.current?.videoHeight === 0) {
                        alert('El video no es compatible con su navegador, intente usar Safari o IE.');
                      }
                    }}
                    onLoadStart={() => {
                      const timeToStart = getTimeStamp('openedVideos',props.title);
                      videoRef.current.currentTime=timeToStart;
                      }}
                    onContextMenu={e => e.preventDefault()}>
                    <source type="video/mp4" src={props.url}/>
                    Your browser doesn't support video, Choose a better browser!
                </video>
            </div>
    </div> 
  )
}

export default VideoPlayer
