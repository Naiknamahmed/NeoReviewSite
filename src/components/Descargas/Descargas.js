import React, {useRef, useState} from 'react';

import './styles.css';
import download from '../../assets/img/images/down.png';
import upload from '../../assets/img/images/subidas.png';
import DownloadMaterial from './DownloadMaterial/DownloadMaterial';

const Descargas = () => {
  const [view, setView] = useState('download');
  const uploadref= useRef();
  const downloadref= useRef();

  function handleClick (e) {
    if(e.target.name==='download') {
      uploadref.current.style.opacity=0.5;
      downloadref.current.style.opacity=1;
      setView('download');
    }
    else if(e.target.name==='upload') {
      uploadref.current.style.opacity=1;
      downloadref.current.style.opacity=0.5;
      setView('upload');
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">   
          <img name="download" ref={downloadref} src={download} alt="download icon" className='buttonStyle' onClick={handleClick}/>
          <img name="upload" ref={uploadref} src={upload} alt="upload icon" className='buttonStyle' style={{marginLeft:'10%', opacity:0.5}} onClick={handleClick}/>  
      </div>
      <div className='flex flex-col justify-center' style={{marginTop:'3%', marginLeft:'2%'}}>
      {view === 'download' ? <DownloadMaterial /> : null}
      </div>
    </div>
  )
}

export default Descargas
