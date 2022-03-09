import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import useStyles from './styles.js'
import icon from '../../assets/img/images/icons-menu-white.svg'
import logo from '../../assets/img/images/veoestudio.png'
import {Link, useLocation} from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF",
      '&:hover': {
        textDecoration: 'none',
        color: 'white',
    },
    },
  })(Typography);

const HomeNavbar = (props) => {
    const classes= useStyles();

    return (
        <>
        <AppBar position="sticky" className={classes.appBar} color="inherit">
        <Toolbar>
            <WhiteTextTypography variant="h6" className={classes.title} onClick={props.toggleSideMenu} style={{cursor:"pointer"}}>
                <img src={icon} alt="menu" height="25px" className={classes.image}/>
                Menu
            </WhiteTextTypography>
                <img src={logo} className={classes.logo} alt="logo" style={{height:'100px'}}/>
            <div className={classes.grow} />
        </Toolbar>
        </AppBar>
        </>
    )
}

export default HomeNavbar;
