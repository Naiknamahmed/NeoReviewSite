import React from 'react'
import ReactPlayer from 'react-player/lazy'
import './styles.css'

const ClassesPlayer = (props) => {

  return (
    <div className='container' >
        <div className='player-wrapper'> 
        { props.url==='' ? <div style={{display:'flex', justifyContent:'center', paddingTop:'20%'}}>Selecciona un archivo para empezar.</div>
            : <ReactPlayer
            className='react-player'
            url={props.url}
            width="750" height="500"
            controls={true}
            muted={true}
            playing={true}
            />  
        }
        </div>
    </div>
  )
}

export default ClassesPlayer
