import React, {useState} from 'react';
import useStyles from './styles';

const SideMenu = (props) => {

    const [menu] = useState([
        'Mi escritorio',
        'Actividades',
        'Entrenamiento',
        'clases',
        'Examenes',
        'Temario',
        'Video',
        'Batalla',
        'Ranking global',
        'Audiolibro',
        'Repaso',
        'Entrevista',
        'Descargas',
        'Salir',
      ]);
    
      const [fileNames] = useState([
        'Calendario',
        'Actividades',
        'Entrenamiento',
        'clases',
        'examen',
        'Temario',
        'Video',
        'Batalla',
        'ranking',
        'audiolibro',
        'repaso',
        'entrevista_personal',
        'descargas',
        'salir',
      ]);

    const classes= useStyles();

    return (
      <>
        <div style={{width: props.width}} className={classes.container}>
        {menu.map((x, i) => (
            <div className={`${classes.sidebaritems} flex items-center cursor-pointer transition-opacity duration-100 ease-out opacity-100 hover:opacity-50`}>
                <img
                    alt='...'
                    className='w-1/6 '
                    src={require(`assets/img/images/${fileNames[i]}.png`).default}
                />
                <div>
                    {x}
                </div>
            </div>
        ))}
        </div>
      </> 
  )
}
export default SideMenu;
