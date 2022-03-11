import React from 'react'
import useStyles from './styles';
import './styles.css';

const Homepage = () => {
    const classes= useStyles();
  return (
    <div className={classes.container}>
       <div className={`${classes.wrapper} flex justify-between`}>
            <div style={{marginLeft:'0'}} className='mr-1 w-1/4 lg:w-1/12 h-2/5 lg:ml-24'>
                <img alt='...' src={require('assets/img/images/layer_25.png').default}/>
            </div>
            <div className='imgWidth mr-1'>
                <img alt='...' src={require('assets/img/images/Empleo_cabo.png').default}/>
                <h2 className={`${classes.font} text-center fontSize`}>Cabo</h2>
                <p className='text-center fontSize'>Christina</p>
            </div>
            <div className='mr-1 imgWidth2'>
                <img alt='...' src={require('assets/img/images/Nivel.png').default}/>
                <h2 className={`${classes.font} text-center fontSize`}>2657</h2>
                <p className='text-center fontSize'>Experiencia</p>
            </div>
            <div className='mr-1 imgWidth'>
                <img alt='...' src={require('assets/img/images/Medallas.png').default}/>
                <h2 className={`${classes.font} text-center fontSize`}>20</h2>
                <p className='text-center fontSize'>Aptos</p>
            </div>
            <div className='mr-1 imgWidth'>
                <img style={{paddingBottom:'25%'}} alt='...' src={require('assets/img/images/Recurso3Pestaaprueba.png').default}/>
                <h2 className={`${classes.font} text-center fontSize`}>85</h2>
                <p className='text-center fontSize'>Puntos</p>
            </div>
            <div className='mr-1 imgWidth'>
                <img style={{paddingBottom:'25%'}} alt='...' src={require('assets/img/images/Porcentaje2.png').default}/>
                <h2 className={`${classes.font} text-center fontSize`}>68</h2>
                <p className='text-center fontSize'>Percentil</p>
            </div>
            </div>
    </div>
  )
}

export default Homepage
