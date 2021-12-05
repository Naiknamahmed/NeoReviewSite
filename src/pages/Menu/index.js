import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
function Menu() {
  const [value, setValue] = useState(false);
  const [slidersText, setSlidersText] = useState([
    'Dummy Text 1',
    'Dummy Text 2',
    'Dummy Text 3',
    'Dummy Text 4',
    'Dummy Text 5',
    'Dummy Text 6',
    'Dummy Text 7',
  ])
  const sliderPosition = (e, val) => {
    var span = document.getElementById("sliderId");
    span.children[3].textContent = val+'%';
    if (val >= 80) {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  return (
    <div className="bg-image12">
      <div className="menuBackColor"></div>
      <div className="overflow-x-auto h-full w-full relative z-10">
        <div className="flex">
          <div className="text-white lg:ml-28 ml-4 my-10">
            <p className="font-extrabold text-2xl">000001@alumno.com</p>
            <p><span className="font-black text-xl">Usuario:</span> <span>00001</span></p>
            <p><span className="font-black text-xl">Baremo:</span> <span>3</span></p>
            <p><span className="font-black text-xl">N alumnos ranking:</span> <span>315</span></p>
          </div>
          <div className="ml-auto lg:mr-20 mr-5 mt-10">
          <img
            alt='...'
            className='w-10 cursor-pointer'
            src={require('assets/img/images/refresh.png').default}
          />
          </div>
        </div>
        {slidersText.map((x, i) => (
          <div key={i} className="flex">
            <div className="w-3/4 lg:w-5/12 lg:ml-20 ml-2 relative mt-10">
              <p className="absolute z-10 top-6 lg:top-9 md:top-10 left-10 text-white">{x}</p>
              <Slider
                defaultValue={50}
                aria-label="Small"
                onChange={sliderPosition}
                className={value ? "sliderMargin" : ""}
                id="sliderId"
              />
            </div>
            <div className="w-3/12 lg:w-5/12 flex content-center items-center justify-center mt-10 text-white">0.44 pts</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
