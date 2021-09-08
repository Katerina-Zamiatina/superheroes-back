const app = require('../app');
const path = require('path');
const { connectMongo } = require('../src/db/connection');
require('dotenv').config();
const createNewFolder = require('../src/helpers/createFolder');

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const IMG_DIR = path.join(
  process.cwd(),
  process.env.PUBLIC_DIR,
  process.env.IMG_DIR,
);

const start = async () => {
  try {
    await connectMongo();
    console.log('Database connection successful');
    app.listen(PORT, err => {
      if (err) console.error('Server failed:', err);
      await createNewFolder(UPLOAD_DIR);
      await createNewFolder(IMG_DIR);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
};

start();
