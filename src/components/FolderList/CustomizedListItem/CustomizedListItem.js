import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import folder from '../../../assets/img/images/directory.png';
import List from '@mui/material/List';

const CustomizedListItem = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(!open);
    };

    const openPdf = (fileName) => {
        let id=0;
        props.parentFolder.files.forEach((file)=>{
            if(file.name===fileName){
                id=file.id;
            }
        })
        const info={
            folderId:props.parentFolder.id,
            fileId:id
        }
        
        props.setPdf(info);
    };
  return (
    <div>
       <ListItemButton onClick={handleClick}>
            <ListItemAvatar>
                <Avatar alt="folder" src={folder} />
            </ListItemAvatar>
            <ListItemText primaryTypographyProps={{fontFamily:'ProximaNovaSoft-regular'}}  primary={`T${props.count} - ${props.folder}`} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {
                props.files.map((file)=>{
                return (
                    <ListItemButton onClick={()=>{if(!props.isVideo){openPdf(file)}}} sx={{ pl: 4, pt: 0, pb:0 }}>
                        <ListItemText primary={file} />
                    </ListItemButton>
                )
            })
            }
            </List>
        </Collapse>
    </div>
  )
}
export default CustomizedListItem
