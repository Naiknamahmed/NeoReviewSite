import React from 'react';
import './styles.css';

const VideoPlayer = () => {
  return (
    <div className='div1'>
            <div className='div2'>
                <video width="750" height="500" controls >
                    <source src="" type="video/mp4"/>
                    Your browser doesn't support video!
                </video>
            </div>
    </div> 
  )
}

export default VideoPlayer
