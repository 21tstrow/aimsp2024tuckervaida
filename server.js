const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5001;

app.use(cors());

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Define a route for handling file uploads
app.post('/api/upload', upload.array('files'), (req, res) => {
    res.json({ message: 'Files uploaded successfully' });
});

// Define a route to get the list of files
app.get('/public/uploads', (req, res) => {
    const directoryPath = path.join(__dirname, 'public', 'uploads');
    // Read the directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        const fileData = files.map(file => {
            return {
                title: file,
                imageUrl: `/uploads/${file}`
            };
        });
        res.json(fileData);
    });
});

// Serve static files from the public directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const pdfUpload = multer({ storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Ensure this is the directory where PDFs are stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name to overwrite
    }
}) });

app.post('/api/upload-pdf', pdfUpload.single('file'), (req, res) => {
    console.log('Received file:', req.file.originalname);
    res.json({ message: 'PDF updated successfully' });
});