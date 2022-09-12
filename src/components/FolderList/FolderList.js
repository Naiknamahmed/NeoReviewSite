import React, {useEffect, useState} from 'react';
import List from '@mui/material/List';
import CustomizedListItem from './CustomizedListItem/CustomizedListItem';
import { getLocalUserdata } from '../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import useStyles from '../MUIScrollbar/MUIScrollbar';
import Accordion from "@mui/material/Accordion";
import LinearProgress from "@mui/material/LinearProgress";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FolderList = (props) => {
    const classes = useStyles();
    const [folders, setFolders] = useState([]);
    let count=0;

    useEffect (() => {
        setFolders([]);
        const data=getLocalUserdata();
        userServices.commonPostService('/getDownloadPdfFolders',{"studentType":data.type,"studentId":data.id})
        .then(response=>{
            if(response.data.status==='Successfull') {
                response.data.folders.map(async (folder) => {
                    await userServices.commonPostService('/getDownloadPdfFiles',{"folderId":folder.id,"studentId":data.id})
                    .then(response => {
                        if(response.data.message==='success') { 
                            setFolders(oldArray => [...oldArray, {
                                id:folder.id,
                                name:folder.name===null? '-': folder.name,
                                files: response.data.files.map((file)=>{
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
                        toast.error("Error fetching files.");
                    })
                })
            }
            else {
                toast.error("Error fetching folders.");
            }
        })
        .catch((error)=> {
            toast.error("Error fetching folders.");
        });

    },[])

    return (
        <div style={{marginLeft:'2%', width:props.folderToggle}}>
            <List 
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow:'auto', maxHeight:'100vh' }}
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
                            <CustomizedListItem parentFolder={folder} setPdf={props.setPdf} count={count} folder={folderName} files={files2}/>
                        )
                    }) : <div>Cargando carpetas...</div>
            }
            </List>
        </div>
    )
}
export default FolderList
