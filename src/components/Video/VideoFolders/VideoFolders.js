import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import CustomizedListItem from '../../FolderList/CustomizedListItem/CustomizedListItem';
import { getLocalUserdata } from '../../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import ErrorService from 'services/formatError/ErrorService';
import { makeStyles } from "@material-ui/core/styles";

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

const VideoFolders = (props) => {
    const classes = useStyles();
    const [folders, setFolders] = useState([]);
    let count=0;

    useEffect (() => {
        setFolders([]);
        const data=getLocalUserdata();
        userServices.commonPostService('/getTopics',JSON.stringify({"studentType":data.type,"studentId":data.id,"type":'video'}))
        .then(response=>{
            if(response.data.status==='Successfull') {
                response.data.data.map(async (folder) => {
                    await userServices.commonPostService('/getVideoFiles',JSON.stringify({"id":folder.id,"studentId":data.id,"offset":'1'}))
                    .then(response => {
                        console.log(response)
                        if(response.data.status==='Successfull') { 
                            setFolders(oldArray => [...oldArray, {
                                id:folder.id,
                                name:folder.name===null? '-': folder.name,
                                files: response.data.data.map((file)=>{
                                    const temp={
                                        id:file.id,
                                        name:file.title===null ? file.name : file.title,
                                    }
                                    return temp;
                                })
                            }]);
                        }
                        else{
                            toast.error("Error fetching files.");
                        }
                    })
                    .catch((err) => {
                        console.log(ErrorService.uniformError(err));
                        toast.error("Error fetching files.");
                    })

                })
            }
            else {
                toast.error("Error fetching folders.");
            }
        })
        .catch((error)=> {
            console.log(ErrorService.uniformError(error))
            toast.error("Error fetching folders.");
        });

    },[])

    return (
        <div style={{marginTop:'2%', marginLeft:'2%'}}>
            <List 
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow:'auto', maxHeight:'35vh' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}>  
            { 
                folders.length>0 ?                
                    folders.map((folder) => {
                        let files2=[];
                        let folderName;
                        for (const [key, value] of Object.entries(folder)) {
                            if(key==='files'){
                                value.map((file)=>{
                                    files2.push(file.name);
                                })
                            }
                            if(key==="name"){
                                folderName=value;
                            }
                        }  
                        count++;
                        return (         
                            <CustomizedListItem isVideo={'true'} parentFolder={folder} setPdf={props.setPdf} count={count} folder={folderName} files={files2}/>
                        )
                    }) : <div>Loading folders ...</div>
            }
            </List>
        </div>
    )
}

export default VideoFolders
