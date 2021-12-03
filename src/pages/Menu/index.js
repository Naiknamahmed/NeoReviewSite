import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
function Menu() {
  const [value, setValue] = useState(false);

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
      <div style={{width: '50%'}}>
        <Slider
          size="small"
          defaultValue={70}
          aria-label="Small"
          onChange={sliderPosition}
          className={value ? "sliderMargin" : ""}
        />
      </div>
    </div>
  );
}

export default Menu;
