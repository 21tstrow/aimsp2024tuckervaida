import React from 'react';
import { useState } from "react";
import axios from "axios";
import './UploadPage.css'; // Import CSS file for styling

const UploadPage = () => {
    const [ files, setFiles] = useState(null);
    const [ progress, setProgress] = useState ({ started: false, pc: 0});
    const [msg, setMsg] = useState(null);
    
    function handleUpload() {
        if (!files) {
            console.log("No file selected")
            return;
        }
        
        const fd = new FormData();
        for (let i = 0; i < files.length; i++) {
            fd.append('files', files[i]); // Use 'files' as the field name
        }

        setMsg("Uploading...")
        setProgress(prevState => {
            return {...prevState, started: true}
        })
        axios.post('http://localhost:5001/api/upload', fd, {
            onUploadProgress: (progressEvent) => { setProgress(prevState => {
                return { ...prevState, pc: progressEvent.progress*100 }
            }) },
            headers: {
               "Custom-Header": "value", 
            }
        })
        .then(res => {
            setMsg("Upload successful")
            console.log(res.data)
        })
        .catch(err => {
            setMsg("Upload failed")
            console.error(err)
        });
    }


    return (
    <div>
      <h1>Upload a PDF</h1>
      
      <input onChange={ (e) => {setFiles(e.target.files)}} type="file" multiple></input>
      
      <button onClick={ handleUpload } type="submit" className="upload-button">Upload</button>
      {progress.started && <progress max="100" value={progress.pc}></progress>}
      { msg && <span>{msg}</span>}
    </div>
  );
};

export default UploadPage;