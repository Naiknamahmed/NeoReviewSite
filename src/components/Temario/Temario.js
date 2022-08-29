import React, {useState} from 'react';
import PdfCard from 'components/pdfCard/pdfCard';
import FolderList from 'components/FolderList/FolderList';

const Temario = (props) => {
    const [pdf, setPdf] = useState({});
    const updatePdf = (val) => {
        setPdf(val);
    }

    return (
        <div className='flex flex-row' style={{overflow:'auto', justifyContent: props.folderToggle==='0%'?'center':'unset',marginLeft:'2%'}}>
            <FolderList folderToggle={props.folderToggle} setPdf={updatePdf}/>
            <PdfCard pdf={pdf} load={false}/>
        </div>
  )
}
export default Temario
