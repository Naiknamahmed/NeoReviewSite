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
        <div className="text-white ml-28 my-10">
          <p className="font-extrabold text-2xl">000001@alumno.com</p>
          <p><span className="font-black text-xl">Usuario:</span> <span>00001</span></p>
          <p><span className="font-black text-xl">Baremo:</span> <span>3</span></p>
          <p><span className="font-black text-xl">N alumnos ranking:</span> <span>315</span></p>
        </div>
        {slidersText.map((x) => (
          <div className="flex">
            <div className="w-5/12 ml-20 relative mt-10">
              <p className="absolute z-10 top-8 left-10 text-white">{x}</p>
              <Slider
                defaultValue={50}
                aria-label="Small"
                onChange={sliderPosition}
                className={value ? "sliderMargin" : ""}
              />
            </div>
            <div className="w-5/12 flex content-center items-center justify-center mt-10 text-white">{x}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
