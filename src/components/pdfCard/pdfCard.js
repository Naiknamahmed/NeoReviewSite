import React, {useState, useEffect} from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import './styles.css';
import { getLocalUserdata } from '../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';
import ErrorService from 'services/formatError/ErrorService';

const PdfCard = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [fileName, setFileName] = useState('');


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    useEffect (() => {
        const data=getLocalUserdata();
        userServices.commonPostService('/getDownloadPdfFiles',JSON.stringify({"folderId":props.pdf.folderId,"studentId":data.id}))
        .then(resp => {
            if(resp.data.message==='success') { 
                resp.data.files.forEach((file)=> {
                    if(file.id===props.pdf.fileId){
                        setFileName(file.file);
                    }
                })
            }
            else{
                toast.error("Error downloading pdf.");
            }
        })
        .catch((err) => {
            console.log(ErrorService.uniformError(err));
            toast.error("Error downloading pdf.");
        })
    },[props.pdf])

    if(fileName!=='') {
        return (
            <div style={{paddingLeft:'3%'}} className='flex flex-col justify-center'>
                <div style={{display:'flex', justifyContent:'center', overflow:'auto'}}>
                    <div className="tc dib br3 pa3 ma2 bw2 shadow-5" style={{pointerEvents:'none'}}>
                        <Document file={" https://whispering-chamber-21481.herokuapp.com/" + fileName}
                        onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </div>
                </div>
                <div style={{display:'flex',alignItems:'center', flexDirection:'column'}}>
                    <p>
                        Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                    </p>
                    <div>
                        <button
                        className="temarioButton"
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}>
                            Previous
                        </button>
                        <button
                        className="temarioButton"
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}>
                            Next
                        </button>
                    </div>
                </div> 
            </div>   
          )
    }
    else {
        return (<div style={{paddingLeft:'3%'}} className='flex justify-center'>   
        </div>)
    }
 
}

export default PdfCard
