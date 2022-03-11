import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from 'components/Navbars/HomeNavbar.js';
import SideMenu from 'components/SideMenu/SideMenu.js';
import Homepage from 'components/Homepage/Homepage';

function Home() {
  const history = useNavigate();
  const [wid, setWid] = useState('0%');
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleSideMenu = ( ) => {
    if(toggleMenu===true){
      setWid('0%');
      setToggleMenu(false);
    }
    else if(toggleMenu===false){
      setWid('26%')
      setToggleMenu(true);
    }
 }
  return (
    <>
      <HomeNavbar toggleSideMenu={toggleSideMenu}/>
        <SideMenu width={wid}/>
        <Homepage/>   
    </>
  );
}
export default Home;
