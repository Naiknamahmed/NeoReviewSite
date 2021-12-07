import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Home() {

  const history = useNavigate();
  const [menu, setMenu] = useState([
    'Actividades',
    'Entrenamiento',
    'Objetivos',
    'Novedades',
    'Calendario',
    'Examenes',
    'Temario',
    'Audiolibro',
    'Video',
    'Memorización',
    'Batalla',
    'Preguntas',
    'Ranking global',
    'Repaso',
    'Entrevista',
    'Profesorado',
    'Descargas',
    'Pruebas físicas',
    'ipídelo ya!',
    'Salir'
  ])

  const [fileNames, setFileNames] = useState([
    'Actividades',
    'Entrenamiento',
    'Objetivos',
    'novedades',
    'Actividades',
    'examen',
    'Temario',
    'audiolibro',
    'Video',
    'Memorización',
    'Batalla',
    'preguntas_frecuentes',
    'ranking',
    'repaso',
    'entrevista_personal',
    'profesorado',
    'descargas',
    'pruebas_físicas',
    'pídelo_ya',
    'salir'
  ])

  return (
    <div>
      <main>
        <section className='relative w-full h-full py-1 min-h-screen'>
          <div className='mx-auto h-full'>
            <div className='flex content-center items-center justify-center h-full'>
              <div className='w-full'>
                <div className='relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-white border-0'>
                  <div className='rounded-t mb-0'>
                    <div className='flex grid bg-image12'>
                      <div className="overflow-auto">
                        <div className="flex">
                          <img
                          alt='...'
                          className='w-8 h-8 mt-4 ml-2 lg:w-20 lg:h-20 lg:mt-16 lg:ml-5 mr-1 cursor-pointer'
                          src={require('assets/img/images/menu.svg').default}
                          onClick={() => {history('/menu')}}
                          />
                          <img
                          alt='...'
                          className='w-full mr-1'
                          src={require('assets/img/images/veoestudio.png').default}
                          />
                        </div>
                        <div className="flex justify-between">
                          <div className='mr-1 w-1/4 h-2/5 lg:ml-24'>
                            <img
                              alt='...'
                              src={require('assets/img/images/Photo_or_avatar.png').default}
                              />
                          </div>
                          <div className='mr-1 w-9-p h-2/5'>
                            <img
                            alt='...'
                            src={require('assets/img/images/Empleo_cabo.png').default}
                            />
                            <p className="text-center">Cabo</p>
                          </div>
                          <div className='mr-1 w-20-p h-2/5'>
                            <img
                            alt='...'
                            src={require('assets/img/images/Nivel.png').default}
                            />
                            <p className="text-center lg:mt-9">0</p>
                          </div>
                          <div className='mr-1 w-1/12 h-2/5 mr-10 lg:mr-24'>
                            <img
                            alt='...'
                            src={require('assets/img/images/Medallas.png').default}
                            />
                            <p className="text-center lg:mt-7">0</p>
                          </div>
                        </div>
                        <div>
                        {menu.map((x, i) => (
                          <div className='flex items-center mt-10 cursor-pointer transition-opacity duration-100 ease-out opacity-100 hover:opacity-50'>
                            <img
                            alt='...'
                            className="w-2/6"
                            src={require(`assets/img/images/${fileNames[i]}.png`).default}
                            />
                            <p className="text-4xl lg:text-8xl RoundElegance-Regular">{x}</p>
                          </div>
                        ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
