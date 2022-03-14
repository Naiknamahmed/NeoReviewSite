import React, {useState} from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import './styles.css';

const Temario = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

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

    return (
        <div className='flex flex-col justify-between'>
            <div style={{display:'flex', justifyContent:'center', overflow:'auto'}}>
                <div className="tc dib br3 pa3 ma2 bw2 shadow-5" style={{pointerEvents:'none'}}>
                    <Document file={" https://whispering-chamber-21481.herokuapp.com/" + 'https://www.agstartups.org.br/uploads/2020/07/sample.pdf'}
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
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                    Previous
                </button>
                <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                >
                    Next
                </button>
                </div>
            </div>
        </div>
  )
}

export default Temario
