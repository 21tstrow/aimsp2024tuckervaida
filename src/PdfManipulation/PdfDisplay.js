import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf/viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';
import './PdfDisplay.css';
import "react-pdf/dist/esm/Page/TextLayer.css";
import { PDFDownloadLink, PageText } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

function PdfDisplay({ file, onTextSelect, useAdvancedViewer = false }) {
    const [selectedText, setSelectedText] = useState('');

    const handleTextSelection = () => {
        const selection = window.getSelection();
        const text = selection.toString();
        setSelectedText(text);
        if (onTextSelect) onTextSelect(text);
        console.log("Selected Text:", text);
    };

    useEffect(() => {
        if (useAdvancedViewer) {
            window.addEventListener('mouseup', handleTextSelection);
            return () => {
                window.removeEventListener('mouseup', handleTextSelection);
            };
        }
    }, [useAdvancedViewer, onTextSelect]);

    const downloadPdf = async () => {
        try {
            const blob = await fetch(file).then(res => res.blob());
            saveAs(blob, "downloaded.pdf");
        } catch (error) {
            console.error('Error downloading the file: ', error);
        }
    };

    return (
        <div className='pdf-display-container'>
            {useAdvancedViewer ? (
                <Worker workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`}>
                    {file && (
                        <Viewer
                            fileUrl={file}
                            defaultScale={0.95}
                            onDocumentLoad={({ numPages }) => console.log('Loaded a file with ', numPages, ' pages')}
                            onTextSelection={handleTextSelection}
                        />
                    )}
                    <button onClick={downloadPdf}>Download PDF</button>
                </Worker>
            ) : (
                file && (
                    <embed src={file} type="application/pdf" width="100%" height="100%" />
                )
            )}
        </div>
    );
}

export default PdfDisplay;
