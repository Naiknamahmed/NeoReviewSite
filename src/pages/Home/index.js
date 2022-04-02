import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "components/Navbars/HomeNavbar.js";
import SideMenu from "components/SideMenu/SideMenu.js";
import Homepage from "components/Homepage/Homepage";
import Temario from "components/Temario/Temario";
import ExamenesPage from "pages/Examenes/index";
import Video from "components/Video/Video";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  const history = useNavigate();
  const [wid, setWid] = useState("0%");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState("Mi escritorio");
  const [folderToggle, setFolderToggle] = useState("0%");

  const toggleSideMenu = () => {
    if (toggleMenu === true) {
      setWid("0%");
      setFolderToggle("0%");
      setToggleMenu(false);
    } else if (toggleMenu === false) {
      setWid("20%");
      setFolderToggle("100%");
      setToggleMenu(true);
    }
  };

  const updatePage = (option) => {
    setCurrentPage(option);
  };

  const renderOption = () => {
    if (currentPage === "Mi escritorio") return <Homepage />;
    else if (currentPage === "Temario")
      return <Temario folderToggle={folderToggle} />;
    else if (currentPage === "Exámenes") return <ExamenesPage />;
    else if (currentPage === "Video")
      return <Video folderToggle={folderToggle} />;
  };

  return (
    <>
      <HomeNavbar toggleSideMenu={toggleSideMenu} />
      <div style={{}}>
        <SideMenu width={wid} updatePage={updatePage} />
        {renderOption()}
      </div>
    </>
  );
}
export default Home;
