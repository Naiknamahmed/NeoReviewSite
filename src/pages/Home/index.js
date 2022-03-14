import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from 'components/Navbars/HomeNavbar.js';
import SideMenu from 'components/SideMenu/SideMenu.js';
import Homepage from 'components/Homepage/Homepage';
import Temario from 'components/Temario/Temario';

function Home() {
  const history = useNavigate();
  const [wid, setWid] = useState('0%');
  const [toggleMenu, setToggleMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState('default');

  const toggleSideMenu = () => {
    if(toggleMenu===true){
      setWid('0%');
      setToggleMenu(false);
    }
    else if(toggleMenu===false){
      setWid('26%')
      setToggleMenu(true);
    }
  }

  const updatePage = (option) => {
    setCurrentPage(option);
  }

  const renderOption = () => {
    if(currentPage==='default')
      return <Homepage/> 
    else if(currentPage === 'Temario')
      return <Temario /> 
  }

  return (
    <>
      <HomeNavbar toggleSideMenu={toggleSideMenu}/>
      <SideMenu width={wid} updatePage={updatePage}/>
      {renderOption()}
    </>
  );
}
export default Home;
