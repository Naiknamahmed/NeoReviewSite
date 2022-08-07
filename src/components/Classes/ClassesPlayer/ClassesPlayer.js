import React, {useRef, useState} from 'react'
import { updateLocalStorageTimeStamp, getTimeStamp} from '../../../services/auth/localStorageData';
import ReactPlayer from 'react-player/lazy'
import './styles.css'

const ClassesPlayer = (props) => {
  const videoRef = useRef();
  const [duration, setDuration]=useState(0);

  const onProgress = (data) => {
    setDuration(videoRef.current.getCurrentTime());
    updateLocalStorageTimeStamp('openedClasses',props.title,duration);
  }

  return (
    <div className='classescontainer' >
        <div className='classesplayer-wrapper'> 
        { props.url==='' ? <div style={{display:'flex', justifyContent:'center', paddingTop:'20%'}}>Selecciona un archivo para empezar.</div>
            : <ReactPlayer
            // Disable download button
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            // Disable right click
            onContextMenu={e => e.preventDefault()}
            className='classesreact-player'
            width="750" height="500"
            url={props.url}
            controls={true}
            muted={true}
            playing={true}
            ref={videoRef} 
            onProgress={onProgress}
            onStart={() => {
              const timeToStart = getTimeStamp('openedClasses',props.title);
              videoRef.current.seekTo(timeToStart,'seconds');
            }}
            />  
        }
        </div>
    </div>
  )
}

export default ClassesPlayer
