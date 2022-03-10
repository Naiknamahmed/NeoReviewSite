import React, {useState} from 'react';

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

    return (
      <>
        <div style={{transition: '.5s ease',backgroundColor:'silver', float:'left', width: props.width}}>
        {menu.map((x, i) => (
            <div style={{ paddingTop:'15px' }} className='sidebaritems flex items-center cursor-pointer transition-opacity duration-100 ease-out opacity-100 hover:opacity-50'>
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
