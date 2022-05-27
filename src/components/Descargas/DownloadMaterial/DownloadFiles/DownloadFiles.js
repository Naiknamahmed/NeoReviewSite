import React, {useEffect, useState} from 'react';
import { getLocalUserdata} from '../../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import downloadIcon from '../../../../assets/img/images/Flecha descarga azul.png';
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { saveAs } from 'file-saver';

const useStyles = makeStyles((theme) => ({
    listItem : {
      "&&": {
        [theme.breakpoints.down('580')]: {
        display: 'block',
      },
    }
    },
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

const DownloadFiles = (props) => {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
  
    useEffect (() => {
      const data=getLocalUserdata();
      userServices.commonPostService('/getDownloadFiles',JSON.stringify({"folderId":props.folderId,"studentId":data.id}))
      .then(response=>{
        console.log(response.data);
        if(response.data.message==='success') {
          response.data.files.forEach((item)=>{
            setFiles(oldArray => [...oldArray, {
              title:item.title===null?item.name:item.title,
              url:item.file,
            }]);
          })
        }
        else{
          toast.error("Error fetching files.");
        }
      })
      .catch((error)=> {
        toast.error("Error fetching files");
      });
  
    },[])

    const downloadFile = ({url}) => {
        const fileName = url.split("/").pop(); 
        (async () => {
            let blob = await fetch(`https://whispering-chamber-21481.herokuapp.com/${url}`).then((r) => r.blob());
            saveAs(blob, fileName);
         })();
    }
  
    return (
      <>
        <IconButton style={{justifyContent:'center', display: 'flex'}}onClick={()=>{props.updateView('folders')}}>
          <ArrowBackIcon/>
          <Typography variant="subtitle2">Volver a las carpetas</Typography>
        </IconButton>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow:'auto', maxHeight:'55vh', alignSelf:'center'}}
        className={classes.root}>
        {
          files.length>0 ? 
          files.map((item) => {
            return (
              <ListItemButton className={classes.listItem} onClick={()=>downloadFile(item)}>
                <ListItemAvatar>
                  <Avatar alt="videofile" src={downloadIcon} variant="square"/>
                </ListItemAvatar>
                <ListItemText primaryTypographyProps={{fontFamily: 'ProximaNovaSoft-regular'}}  primary={item.title}/>
              </ListItemButton>
            )
          }) : <div style={{ display:'flex', justifyContent:'center'}}> <CircularProgress disableShrink/> </div>
        }
        </List>
      </>    
    )
}

export default DownloadFiles
