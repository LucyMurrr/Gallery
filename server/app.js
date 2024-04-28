import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3001;
app.use(cors());

const uploadDirectory = 'uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage});

app.post('/images', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Нет загруженного файла');
  }
  const filePath = req.file.path;
  console.log('Файл загружен:', filePath);

  res.status(200).send('Файл успешно загружен');
});

app.get('/images', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) {
      return res.status(500).send('Ошибка при чтении директории загрузок');
    }
  
    const imageUrls = files
      .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
    })
      .map(file => `/uploads/${file}`);
  
    res.json(imageUrls);
  });
});
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

export default app;