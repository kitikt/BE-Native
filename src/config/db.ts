// src/config/connection.ts
import mongoose from 'mongoose';

const dbState = [
  { value: 0, label: "disconnected" },
  { value: 1, label: "connected" },
  { value: 2, label: "connecting" },
  { value: 3, label: "disconnecting" }
];

const connectDB = async () => {
  try {
    const options = {

      dbName: process.env.DB_NAME || 'RecipeApp',

    };

    const uri =  'mongodb://localhost:27017/RecipeApp';

    await mongoose.connect(uri, options);

    const state = mongoose.connection.readyState;
    console.log(dbState.find(s => s.value === state)?.label || 'unknown', 'to db');
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
};

export default connectDB;
