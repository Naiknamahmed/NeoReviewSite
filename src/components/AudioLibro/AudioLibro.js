import React, {useState} from 'react';
import AudioPlayer from './AudioPlayer/AudioPlayer.js';
import AudioFolder from './AudioFolder/AudioFolder.js';

const AudioLibro = () => {
  const [url,setUrl]=useState('');
  const [title,setTitle]=useState('');

  const updateUrl = (val,title) => {
    setUrl(val);
    setTitle(title);
  }

  return (
    <div className='flex justify-center items-center'>
      <AudioFolder updateUrl={updateUrl}/>
      <AudioPlayer url={url} title={title}/>
    </div>
  )
}
export default AudioLibro
