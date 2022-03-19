import React, {useState} from 'react';
import PdfCard from 'components/pdfCard/pdfCard';
import FolderList from 'components/FolderList/FolderList';

const Temario = (props) => {
    const [pdf, setPdf] = useState({});
    const updatePdf = (val) => {
        setPdf(val);
    }

    //make separate route
    return (
        <div className='flex flex-row' style={{overflow:'auto', justifyContent: props.folderToggle==='0%'?'center':'unset'}}>
            <FolderList folderToggle={props.folderToggle} setPdf={updatePdf}/>
            <PdfCard pdf={pdf}/>
        </div>
  )
}
export default Temario
