import React from 'react';
import List from '@mui/material/List';
import CustomizedListItem from './CustomizedListItem/CustomizedListItem';

const FolderList = () => {
    let count=0;
    const folderName=[
        {
            folder1:['file1','file2','file3'],
        },
        {
            folder2:['file1'],
        },
        {
            folder3:['file1','file2'],
        },
    ]                                                 //dummy directory structure
    return (
        <div style={{marginLeft:'2%'}}>
            <List 
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader">  
            {
                folderName.map((folderName) => {
                    for (const [key, value] of Object.entries(folderName)) {
                        count++;
                        return (
                            <CustomizedListItem count={count} folder={key} files={value}/>
                        )
                    }
                })
            }
            </List>
        </div>
    )
}

export default FolderList
