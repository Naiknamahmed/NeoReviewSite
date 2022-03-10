import React from 'react'
import useStyles from './styles';

const Homepage = () => {
    const classes= useStyles();
  return (
    <div className={classes.container}>
       <div className={`${classes.wrapper} flex justify-between`}>
            <div style={{marginLeft:'0'}} className='mr-1 w-1/4 lg:w-1/6 h-2/5 lg:ml-24'>
                <img alt='...' src={require('assets/img/images/layer_25.png').default}/>
            </div>
            <div className='mr-1 w-9-p h-2/5'>
                <img alt='...' src={require('assets/img/images/Empleo_cabo.png').default}/>
                <h2 className={`${classes.font} text-center`}>Cabo</h2>
                <p className='text-center'>Christina</p>
            </div>
            <div className='mr-1 w-20-p h-2/5'>
                <img alt='...' src={require('assets/img/images/Nivel.png').default}/>
                <h2 className={`${classes.font} text-center`}>2657</h2>
                <p className='text-center'>Experiencia</p>
            </div>
            <div className='mr-1 w-9-p h-2/5'>
                <img alt='...' src={require('assets/img/images/Medallas.png').default}/>
                <h2 className={`${classes.font} text-center`}>20</h2>
                <p className='text-center'>Aptos</p>
            </div>
            <div className='mr-1 w-9-p h-2/5'>
                <img style={{paddingBottom:'25%'}} alt='...' src={require('assets/img/images/Recurso3Pestaaprueba.png').default}/>
                <h2 className={`${classes.font} text-center`}>85</h2>
                <p className='text-center'>Puntos</p>
            </div>
            <div className='mr-1 w-9-p h-2/5'>
                <img style={{paddingBottom:'25%'}} alt='...' src={require('assets/img/images/Porcentaje2.png').default}/>
                <h2 className={`${classes.font} text-center`}>68</h2>
                <p className='text-center'>Percentil</p>
            </div>
            </div>
    </div>
  )
}

export default Homepage
