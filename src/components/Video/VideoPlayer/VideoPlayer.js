import React, {useEffect, useRef} from 'react';
import './styles.css';
import ReactPlayer from 'react-player/lazy';

const VideoPlayer = (props) => {
  const videoRef = useRef();

  useEffect(() => {    
    videoRef.current?.load();
  }, [props.url]);

  return (
    <div className='div1'>
            <div className='div2'>
                <video width="750" height="500" controls autoPlay muted ref={videoRef}>
                    <source src={props.url} type="video/mp4"/>
                    Your browser doesn't support video!
                </video>
            </div>
    </div> 
  )
}

export default VideoPlayer