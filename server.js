/* eslint-disable */
require('dotenv').config()
const { format } = require('util');
const express = require('express');
const { join } = require('path');
const helmet = require('helmet');
const Multer = require('multer');
const compression = require('compression');
const { Storage } = require('@google-cloud/storage');
const morgan = require('morgan');

const PORT = process.env.PORT || 4000;

const app = express();

const storage = new Storage({
  keyFilename: join(__dirname, 'google-credentials.json'),
});

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.static('dist'));

// Process the file upload and upload to Google Cloud Storage.
app.post('/api/v1/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  const name = `test/${req.file.originalname}`
  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(name);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    res.status(200).json({
      publicUrl,
    });
  });

  blobStream.end(req.file.buffer);
});

app.get('/*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () =>
  console.log(`Listening PORT: ${PORT}`)
);
