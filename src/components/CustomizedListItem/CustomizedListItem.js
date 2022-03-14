import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import folder from '../../assets/img/images/folder.jpg';
import List from '@mui/material/List';

const CustomizedListItem = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

  return (
    <div>
       <ListItemButton onClick={handleClick}>
            <ListItemAvatar>
                <Avatar alt="folder" src={folder} />
            </ListItemAvatar>
            <ListItemText primary={`T${props.count} - ${props.folder}`} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {
                    props.files.map((file)=>{
                    return (
                        <ListItemButton sx={{ pl: 4 }}>
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
