import React, {useState, useEffect, useRef} from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import './styles.css';
import { getLocalUserdata } from '../../services/auth/localStorageData';
import userServices from 'services/httpService/userAuth/userServices';
import { toast } from 'react-toastify';

const PdfCard = (props) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [fileName, setFileName] = useState(props.fileName);
    const inputval=useRef();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
        inputval.current.value='';
    }

    function nextPage() {
        changePage(1);
        inputval.current.value='';
    }

    function userChange(e) {
        let temp=parseInt(e.target.value);
        if(temp>0 && temp<=numPages){
            setPageNumber(temp)
        }
    }

    useEffect (() => {
        if(props.fileName!=='' && typeof props.pdf !== "undefined" ) {
            const data=getLocalUserdata();
            userServices.commonPostService('/getDownloadPdfFiles',JSON.stringify({"folderId":props.pdf.folderId,"studentId":data.id}))
            .then(resp => {
                if(resp.data.message==='success') { 
                    resp.data.files.forEach((file)=> {
                        if(file.id===props.pdf.fileId){
                            setFileName(file.file);
                            inputval.current.value='';
                        }
                    })
                }
                else{
                    toast.error("Error downloading pdf.");
                }
            })
            .catch((err) => {
                toast.error("Error downloading pdf.");
            })
        }
    },[props.pdf])

    if(typeof fileName !== "undefined") {
        return (
            <div className='flex flex-col justify-center'>
                <div style={{display:'flex', justifyContent:'center', overflow:'auto'}}>
                    <div className="tc dib br3 pa3 ma2 bw2 shadow-5" style={{pointerEvents:'none'}}>
                        <Document file={" https://whispering-chamber-21481.herokuapp.com/" + fileName}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onContextMenu={e => e.preventDefault()}
                        loading="Cargando PDF..."
                        >
                            <Page renderMode="svg" scale={96/72} pageNumber={pageNumber} />
                        </Document>
                    </div>
                </div>
                <div style={{display:'flex',alignItems:'center', flexDirection:'column'}}>
                    <p style={{display:'flex', justifyContent:'center'}}>
                        Página <input type='text' placeholder={pageNumber || (numPages ? 1 : '--')} 
                        style={{width:'12%',
                        border: '1px solid #111827',
                        paddingLeft: '2%',
                        paddingRight: '1%',
                        marginBottom: '1%',
                        marginLeft: '2%',
                        marginRight: '2%'}}
                        onChange={userChange}
                        ref={inputval}/> of {numPages || '--'}
                    </p>
                    <div>
                        <button
                        className="temarioButton"
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}>
                            <img src={require(`assets/img/images/atras.webp`).default} alt="atras"/>
                        </button>
                        <button
                        className="temarioButton"
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}>
                            <img src={require(`assets/img/images/siguiente.webp`).default} alt="atras"/>
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
