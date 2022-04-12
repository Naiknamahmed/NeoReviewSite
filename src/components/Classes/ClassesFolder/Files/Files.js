import React, {useEffect, useState} from 'react';
import { getLocalUserdata } from '../../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import icon from '../../../../assets/img/images/video_icon.png';
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
      "&::-webkit-scrollbar": {
        width: 7,
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "darkgrey",
        outline: `1px solid slategrey`,
      },
    },
  }));

const Files = (props) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const [loading,setLoading]=useState(true);

  useEffect (() => {
    const data=getLocalUserdata();
    userServices.commonPostService('/getClassTopicsMaterial',JSON.stringify({"type":data.type,"topicId":props.folderId}))
    .then(response=>{
      if(response.status===200) {
        response.data.forEach((item)=>{
          setFiles(oldArray => [...oldArray, {
            title:item.title,
            url:item.url,
          }]);
        })
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

  return (
    <>
      <IconButton style={{justifyContent:'start'}} onClick={()=>{props.updateView('folders')}}>
        <ArrowBackIcon/>
        <Typography variant="subtitle2">Volver a las carpetas</Typography>
      </IconButton>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow:'auto', maxHeight:'40vh' }}
      className={classes.root}>
      {
        files.length>0 ? 
        files.map((item) => {
          return (
            <ListItemButton onClick={()=>{props.updateUrl(item.url)}}>
              <ListItemAvatar>
                <Avatar alt="videofile" src={icon} variant="square"/>
              </ListItemAvatar>
              <ListItemText primaryTypographyProps={{fontFamily:'ProximaNovaSoft-regular'}}  primary={item.title} />
            </ListItemButton>
          )
        }) : loading ? <div style={{ display:'flex', justifyContent:'center'}}> <CircularProgress disableShrink/> </div> : <Typography variant="subtitle2">¡No se encontraron archivos!</Typography>
      }
      </List>
    </>    
  )
}

export default Files