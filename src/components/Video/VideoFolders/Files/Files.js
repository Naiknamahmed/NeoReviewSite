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
  const [offset,setOffset]=useState(1);
  const [call, setCall] = useState(true);
  let isEnd=false;
  const [loading,setLoading]=useState(false);
  const [files, setFiles] = useState([]);

  useEffect (() => {
    const data=getLocalUserdata();
    userServices.commonPostService('/getVideoFiles',JSON.stringify({"id":props.folderId,"studentId":data.id,"offset":offset}))
    .then(response=>{
      if(response.data.status==='Successfull') {
        response.data.data.forEach((item)=>{
          setFiles(oldArray => [...oldArray, {
            title:item.title,
            url:item.url,
          }]);
        })
        if(files.length<15){
          isEnd=true;
        }
        setCall(true);
        setLoading(false);
      }
      else{
        toast.error("Error fetching files.");
      }
    })
    .catch((error)=> {
      toast.error("Error fetching files");
    });

  },[offset])

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 1 ;
    if ((bottom) && (!isEnd) && (call)) { 
          setLoading(true);
          setCall(false)
          setOffset(offset+1)
    }
  }

  return (
    <>
      <IconButton style={{justifyContent:'start'}}onClick={()=>{props.updateView('folders')}}>
        <ArrowBackIcon/>
        <Typography variant="subtitle2">Volver a las carpetas</Typography>
      </IconButton>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow:'auto', maxHeight:'40vh' }}
      onScroll={handleScroll}
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
        }) : <div style={{ display:'flex', justifyContent:'center'}}> <CircularProgress disableShrink/> </div>
      }
      </List>
      {!loading ?  null : <div style={{ display:'flex', justifyContent:'center'}}> <CircularProgress disableShrink/></div>}
    </>    
  )
}

export default Files
