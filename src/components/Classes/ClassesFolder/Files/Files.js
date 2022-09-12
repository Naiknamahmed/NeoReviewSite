import React, {useEffect, useState} from 'react';
import { getLocalUserdata, updatelocalData } from '../../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import icon from '../../../../assets/img/images/video_icon.webp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import useStyles from '../../../MUIScrollbar/MUIScrollbar';

const Files = (props) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [loading,setLoading]=useState(true);

  useEffect (() => {
    userServices.commonPostService('/getClassTopicsMaterial',{"type":"video","topicId":props.folderId})
    .then(response=>{
      if(response.status===200) {
        setFiles(response.data);
        setLoading(false);
      }
      else{
        toast.error("Error fetching files.");
      }
    })
    .catch((error)=> {
      toast.error("Error fetching files");
    });

  },[])

  const searchStorage = (title) => {
    const matchFound=getLocalUserdata().openedClasses.filter((entry) => {return entry.title===title});
    if(matchFound.length===0){
      return false;
    }
    return true;
  }

  return (
    <>
      <IconButton style={{marginTop:'4%' ,justifyContent:'start', display: props.folderToggle==='0%'?'none':'flex'}} onClick={()=>{props.updateView('folders')}}>
        <ArrowBackIcon/>
        <Typography variant="subtitle2">Volver a las carpetas</Typography>
      </IconButton>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow:'auto', maxHeight:'85vh'}}
      className={classes.root}>
      {
        files.length>0 ? 
        files.map((item) => {
          return (
            <ListItemButton className={classes.listItem} onClick={()=>{props.updateUrl(item.material,item.name); updatelocalData('openedClasses',{'title':item.name, 'timeStamp':0})}}>
              <ListItemAvatar>
                <Avatar alt="videofile" src={icon} variant="square"/>
              </ListItemAvatar>
              <ListItemText primaryTypographyProps={{fontFamily:searchStorage(item.name)?'ProximaNovaSoft-bold':'ProximaNovaSoft-regular'}}  primary={item.name} />
            </ListItemButton>
          )
        }) : loading ? <div style={{ display:'flex', justifyContent:'center'}}> <CircularProgress disableShrink/> </div> : <Typography variant="subtitle2">¡No se encontraron archivos!</Typography>
      }
      </List>
    </>    
  )
}

export default Files
