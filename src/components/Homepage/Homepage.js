import React from 'react'
import useStyles from './styles';
import './styles.css';
import { getLocalUserdata } from '../../services/auth/localStorageData';
import profilepic from '../../assets/img/images/layer_25.png';


const Homepage = () => {
    const classes= useStyles();
    const data= getLocalUserdata();

    if(data.photo!=null) {
        profilepic=data.photo
    }
    
    return (
        <div className={classes.container}>
            <div className={`${classes.wrapper} flex justify-between`}>
                <div style={{marginLeft:'0'}} className='mr-1 w-1/4 lg:w-1/12 h-2/5 lg:ml-24'>
                    <img alt='...' src={profilepic}/>
                </div>
                <div className='imgWidth mr-1'>
                    <img alt='...' src={require('assets/img/images/Empleo_cabo.png').default}/>
                    <h2 className={`${classes.font} text-center fontSize`}>Cabo</h2>
                    <p className='text-center fontSize'>{data.name}</p>
                </div>
                <div className='mr-1 imgWidth2'>
                    <img alt='...' src={require('assets/img/images/Nivel.png').default}/>
                    <h2 className={`${classes.font} text-center fontSize`}>2657</h2>
                    <p className='text-center fontSize'>{data.experience}</p>
                </div>
                <div className='mr-1 imgWidth'>
                    <img alt='...' src={require('assets/img/images/Medallas.png').default}/>
                    <h2 className={`${classes.font} text-center fontSize`}>20</h2>
                    <p className='text-center fontSize'>{data.aptos}</p>
                </div>
                <div className='mr-1 imgWidth'>
                    <img style={{paddingBottom:'25%'}} alt='...' src={require('assets/img/images/Recurso3Pestaaprueba.png').default}/>
                    <h2 className={`${classes.font} text-center fontSize`}>85</h2>
                    <p className='text-center fontSize'>{data.points}</p>
                </div>
                <div className='mr-1 imgWidth'>
                    <img style={{paddingBottom:'25%'}} alt='...' src={require('assets/img/images/Porcentaje2.png').default}/>
                    <h2 className={`${classes.font} text-center fontSize`}>68</h2>
                    <p className='text-center fontSize'>{data.percentage}</p>
                </div>
            </div>
        </div>
  )
}
export default Homepage
