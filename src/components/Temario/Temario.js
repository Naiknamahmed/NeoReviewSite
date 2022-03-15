import React from 'react';
import PdfCard from 'components/pdfCard/pdfCard';
import FolderList from 'components/FolderList/FolderList';

const Temario = () => {
    return (
        <div className='flex flex-row' style={{overflow:'auto'}}>
            <FolderList/>
            <PdfCard/>
        </div>
  )
}
export default Temario
