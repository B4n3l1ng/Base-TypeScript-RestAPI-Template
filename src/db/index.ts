// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
import mongoose from 'mongoose';
import path from 'path';

const parentDir = path.basename(path.dirname(path.dirname(path.dirname(__filename))));

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${parentDir}`;

mongoose
  .connect(MONGO_URI)
  .then((x: any) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err: any) => {
    console.error('Error connecting to mongo: ', err);
  });
