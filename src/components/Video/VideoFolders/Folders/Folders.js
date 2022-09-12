import React, {useEffect, useState} from 'react';
import { getLocalUserdata } from '../../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import directory from '../../../../assets/img/images/directory.webp';
import CircularProgress from '@mui/material/CircularProgress';
import useStyles from '../../../MUIScrollbar/MUIScrollbar';

const Folders = (props) => {
  const classes = useStyles();
  const [folders, setFolders] = useState([]);

  useEffect (() => {
    setFolders([]);
    const data=getLocalUserdata();
    userServices.commonPostService('/getTopics',{"studentType":data.type,"studentId":data.id,"type":'video'})
    .then(response=>{
      if(response.data.status==='Successfull') {
        setFolders(response.data.data);
      }
      else{
        toast.error("Error fetching folders.");
      }
    })
    .catch((error)=> {
      toast.error("Error fetching folders.");
    });

  },[])

  const handleClick = (id) => {
    props.updateId(id);
    props.updateView('files');
  }

  return ( 
    folders.length>0 ? 
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto', maxHeight: '85vh', marginTop:'4%' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}>
      {
        folders.map((item) => {
          return (
            <ListItemButton className={classes.listItem} onClick={() => { handleClick(item.id); } }>
              <ListItemAvatar>
                <Avatar alt="folder" src={directory} />
              </ListItemAvatar>
              <ListItemText primaryTypographyProps={{ fontFamily: 'RoundedElegance-regular' }} primary={item.name===null? '-': item.name} />
            </ListItemButton>
          );
        }) }
    </List>
    : <div style={{ display:'flex', justifyContent:'center'}}><CircularProgress disableShrink /></div>
  
  )
}

export default Folders
