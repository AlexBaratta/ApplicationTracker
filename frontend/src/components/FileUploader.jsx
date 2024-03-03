import React, { useState } from 'react';
import axios from 'axios';
import "../CSS/FileUploader.css"
function FileUploader() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };
    

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('No file selected');
            return;
        }
    
        const formData = new FormData();
        formData.append('myFile', selectedFile);
    
        try {
            const response = await axios.post('/api/applications/uploadSpreadSheet', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File successfully uploaded');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        }
    };

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!selectedFile}>
                Upload
            </button>
        </div>
    );
}

export default FileUploader;
