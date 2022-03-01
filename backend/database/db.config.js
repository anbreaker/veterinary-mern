import 'dotenv/config';
import mongoose from 'mongoose';

const urlDB = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(urlDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDb Conected on: ${db.connection.host}:${db.connection.port}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);

    process.exit(1);
  }
};
