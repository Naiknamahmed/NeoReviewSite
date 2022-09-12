import React, {useEffect, useState} from 'react';
import { getLocalUserdata, updatelocalData } from '../../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import icon from '../../../../assets/img/images/90100015.webp';
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
      setFiles([]);
      const data = getLocalUserdata();
      userServices.commonPostService(`/getAudioFiles`, {"id":props.folderId,"studentId":data.id})
      .then(response=>{
        if(response.data.status==='Successfull') {  
          setFiles(response.data.data);
          setLoading(false);
        }
        else {
          toast.error("Error in response.");
        }
      })
      .catch((error)=> {
        toast.error("Error fetching files");
      });
    },[])
  
    const searchStorage = (title) => {
      const matchFound=getLocalUserdata().openedAudios.filter((entry) => {return entry.title===title});
      if(matchFound.length===0){
        return false;
      }
      return true;
    }
  
    return (
      <>
        <IconButton style={{justifyContent:'start'}} onClick={()=>{props.updateView('folders')}}>
          <ArrowBackIcon/>
          <Typography variant="subtitle2">Volver a las carpetas</Typography>
        </IconButton>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow:'auto', maxHeight:'80vh' }}
        className={classes.root}>
        {
          files.length>0 ? 
          files.map((item) => {
            return (
              <ListItemButton className={classes.listItem} onClick={()=>{props.updateUrl(item.url,item.title); updatelocalData('openedAudios',{'title':item.title, 'timeStamp':0})}}>
                <ListItemAvatar>
                  <Avatar alt="videofile" src={icon} variant="square"/>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={{fontFamily:searchStorage(item.title)?'ProximaNovaSoft-bold':'ProximaNovaSoft-regular'}}  primary={item.title} />
              </ListItemButton>
            )
          }) : (!loading&&files.length===0) ? <Typography variant="subtitle2">¡No se encontraron archivos!</Typography> : <div style={{ display:'flex', justifyContent:'center'}}> <CircularProgress disableShrink/> </div>
        }
        </List>
      </>    
    )
}
export default Files
