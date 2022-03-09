import React, {useState} from 'react';

const SideMenu = (props) => {
    const [menu] = useState([
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
        <div>
        {menu.map((x, i) => (
            <div style={{ width: props.width, paddingTop: '20px' }} className='sidebaritems flex items-center cursor-pointer transition-opacity duration-100 ease-out opacity-100 hover:opacity-50'>
                <img
                    alt='...'
                    className='w-1/6 '
                    src={require(`assets/img/images/${fileNames[i]}.png`).default}
                />
                <p className='text-2xl lg:text-4xl RoundElegance-Regular'>
                    {x}
                </p>
            </div>
        ))}
        </div>
      </> 
  )
}

export default SideMenu;
