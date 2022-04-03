import React from "react";
import useStyles from "./styles";
import "./styles.css";
import { getLocalUserdata } from "../../services/auth/localStorageData";
import profilepic from "../../assets/img/images/layer_25.png";
import defaultrank from "../../assets/img/images/Empleo_cabo.png";

const Homepage = () => {
    const classes= useStyles();
    const data= getLocalUserdata();
    
    //default profile pic remaining only
    return (
        <div className={classes.container}>
            <div className={`${classes.wrapper} flex justify-between`}>
                <div style={{marginLeft:'0'}} className='mr-1 w-1/4 lg:w-1/12 h-2/5 lg:ml-24'>
                    <img alt='Profile_picture' src={data.photo!=null ? `https://neoestudio.net/userImage/${data.photo}` : profilepic}/>
                </div>
                <div className='imgWidth3 mr-1'>
                    <img alt='Rank_image' src={data.rank_image!=null ? `https://neoestudio.net/${data.rank_image}` : defaultrank}/>
                    <h2 className={`${classes.font} text-center fontSize`}>{data.rank_name!=null ? data.rank_name : '-'}</h2>
                    <p className='text-center fontSize'>{data.userName!=null ? data.userName : '-'}</p>
                </div>
                <div className='mr-1 imgWidth2'>
                    <img alt='Nivel' src={require('assets/img/images/Nivel.png').default}/>
                    <h2 className={`${classes.font} text-center fontSize`}>{data.experience!=null ? data.experience : 0}</h2>
                    <p className='text-center fontSize'>Experiencia</p>
                </div>
                <div className='mr-1 imgWidth'>
                    <img alt='Medellas' src={require('assets/img/images/Medallas.png').default}/>
                    <h2 className={`${classes.font} text-center fontSize`}>{data.aptos!=null ? data.aptos : 0}</h2>
                    <p className='text-center fontSize'>Aptos</p>
                </div>
                <div className='mr-1 imgWidth'>
                    <img style={{paddingBottom:'25%'}} alt='Puntos' src={require('assets/img/images/Recurso3Pestaaprueba.png').default}/>
                    <h2 className={`${classes.font} text-center fontSize`}>{data.points!=null ? data.points : 0}</h2>
                    <p className='text-center fontSize'>Puntos</p>
                </div>
                <div className='mr-1 imgWidth'>
                    <img style={{paddingBottom:'25%'}} alt='Percentil' src={require('assets/img/images/Porcentaje2.png').default}/>
                    <h2 className={`${classes.font} text-center fontSize`}>{data.percentage!= null ? data.percentage : 0}</h2>
                    <p className='text-center fontSize'>Percentil</p>
                </div>
            </div>
        </div>
  );
};
export default Homepage;
