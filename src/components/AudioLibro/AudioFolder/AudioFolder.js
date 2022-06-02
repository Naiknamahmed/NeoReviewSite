import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Folders from './Folders/Folders'
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

const AudioFolder = (props) => {
    const [view, setView]=useState('folders');
    const [folderId, setFolderId]= useState(0);
    
    const updateView = (val) => {
        setView(val);
    }

    const updateId = (id) => {
        setFolderId(id);
    }

    return (
        <div style={{marginTop:'2%', marginLeft:'2%', marginBottom:'2%', width:"35%"}}>
            {                
            (view==='folders') 
            ? <Folders updateView={updateView} updateId={updateId}/> 
            : <Files updateView={updateView} updateUrl={props.updateUrl} folderId={folderId}/>
            } 
        </div>
    )
}

export default AudioFolder
