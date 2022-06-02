import React, {useRef, useState} from 'react'
import { updateLocalStorageTimeStamp, getTimeStamp} from '../../../services/auth/localStorageData';
import ReactPlayer from 'react-player/lazy'
import './styles.css'

const AudioPlayer = (props) => {
    const audioRef = useRef();
    const [duration, setDuration]=useState(0);
  
    const onProgress = (data) => {
      setDuration(audioRef.current.getCurrentTime());
      updateLocalStorageTimeStamp('openedAudios',props.title,duration);
    }
  
    return (
      <div className='audiocontainer' >
          <div className='audioplayer-wrapper'>
              <ReactPlayer
              // Disable download button
              config={{ file: { attributes: { controlsList: 'nodownload' }, forceAudio: true } }}
              // Disable right click
              onContextMenu={e => e.preventDefault()}
              className='audioreact-player'
              width="50" height="50"
              url={props.url}
              controls={true}
              muted={true}
              playing={true}
              ref={audioRef} 
              onProgress={onProgress}
              onStart={() => {
                const timeToStart = getTimeStamp('openedAudios',props.title);
                audioRef.current.seekTo(timeToStart,'seconds');
              }}
              />  
          
          </div>
      </div>
    )
}

export default AudioPlayer
