import React, { useState } from "react";
import useStyles from "./styles.js";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const SideMenu = (props) => {
  const history = useNavigate();
  const [active, setActive] = useState("Mi escritorio");

  const [menu] = useState([
    "Mi escritorio",
    "Actividades",
    "Entrenamiento",
    "En Directo",
    "Classes",
    "Exámenes",
    "Temario",
    "Videos",
    "Batalla",
    "Ranking global",
    "Audiolibro",
    "Repaso",
    "Entrevista",
    "Descargas",
    "Salir",
  ]);

  const [fileNames] = useState([
    "Calendario",
    "Actividades",
    "Entrenamiento",
    "Directo Module",
    "clases",
    "examen",
    "Temario",
    "Video",
    "Batalla",
    "ranking",
    "audiolibro",
    "repaso",
    "entrevista_personal",
    "descargas",
    "salir",
  ]);

  const classes = useStyles();

  const notActive = ["Entrenamiento", "Batalla", "Entrevista"];

  return (
    <>
      <div
        style={{ width: props.width }}
        className={`shadow-5 ${classes.container}`}
      >
        {menu.map((x, i) => (
          <div
            onClick={() => {
              setActive(x);
              props.updatePage(x);
            }}
            component={Link}
            to={`/${x}`}
            className={`${classes.sidebaritems} sidebaritems items-center cursor-pointer transition-opacity duration-100 ease-out opacity-100 hover:opacity-50`}
          >
            <img
              alt="..."
              className="w-1/5 menuItem"
              src={require(`assets/img/images/${fileNames[i]}.webp`).default}
            />
            <div
              className="fSize"
              style={{
                fontFamily:
                  active === x ? "Montserrat-bold" : "Montserrat-regular",
                opacity: notActive.includes(x) ? "40%" : "1",
              }}
            >
              {x}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SideMenu;
