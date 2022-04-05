import React, {useState,useEffect} from 'react';
import List from '@mui/material/List';
import CustomizedListItem from '../../FolderList/CustomizedListItem/CustomizedListItem';
import { getLocalUserdata } from '../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import ErrorService from 'services/formatError/ErrorService';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@mui/material/CircularProgress';
import Folder from './Folder/Folder'
import Files from './Files/Files'

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


const ClassesFolder = (props) => {
    const [view, setView]=useState('folders');
    const [folderId, setFolderId]= useState(0);
    
    const updateView = (val) => {
        setView(val);
    }

    const updateId = (id) => {
        setFolderId(id);
    }

    return (
        <div style={{marginLeft:'2%', width:props.folderToggle}}>
            {                
            (view==='folders') 
            ? <Folder updateView={updateView} updateId={updateId}/> 
            : <Files folderToggle={props.folderToggle} updateView={updateView} updateUrl={props.updateUrl} folderId={folderId}/>
            } 
        </div>
    )
}

export default ClassesFolder
