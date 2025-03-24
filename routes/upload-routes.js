import multer from 'multer';
import path from 'path';
import express from 'express';

const router = express.Router();

// Set up multer storage and file name handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });


router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded' });
    }
    // Respond with the file path or URL
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

export default router;
