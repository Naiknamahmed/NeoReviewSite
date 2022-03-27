import React, {useState} from 'react';
import Folders from './Folders/Folders';
import Files from './Files/Files';
import { getLocalUserdata } from '../../../services/auth/localStorageData';

const VideoFolders = (props) => {
    const data=getLocalUserdata();
    const [view, setView]=useState('folders');
    const [folderId, setFolderId]= useState(0);
    
    const updateView = (val) => {
        setView(val);
    }

    const updateId = (id) => {
        setFolderId(id);
    }

    return (
        <div style={{marginTop:'2%', marginLeft:'2.5%', marginBottom:'2%', display:'grid'}}>
            {
                (view==='folders') 
                ? <Folders endPoint={'/getTopics'} request={JSON.stringify({"studentType":data.type,"studentId":data.id,"type":'video'})} updateView={updateView} updateId={updateId}/> 
                : <Files updateView={updateView} updateUrl={props.updateUrl} folderId={folderId}/>
            }
        </div>
    )
}

export default VideoFolders
