import React, { useState } from 'react';

const PdfUploader = () => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (validateFile(selectedFile)) {
            setFile(selectedFile);
            previewFile(selectedFile);
        } else {
            alert("This is not a PDF File!");
        }
    };

    const validateFile = (file) => {
        const validExtensions = ["application/pdf"];
        return validExtensions.includes(file.type);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setFileUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (validateFile(droppedFile)) {
            setFile(droppedFile);
            previewFile(droppedFile);
        } else {
            alert("This is not a PDF File!");
        }
    };

    return (
        <div className="pdf-uploader">
            <div className="drag-area" 
                 onDragOver={handleDragOver}
                 onDrop={handleDrop}>
                <header>Drag & Drop to Upload File</header>
                <button onClick={() => document.getElementById('fileInput').click()}>Upload PDF</button>
                <input id="fileInput" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            {fileUrl && <div className="pdf-viewer">
                <embed src={fileUrl} type="application/pdf" width="100%" height="400px" />
            </div>}
        </div>
    );
};

export default PdfUploader;
