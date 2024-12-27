import mongoose from 'mongoose';

const ConnectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Database Connected...');
    } catch (err) {
      console.error('Database Connection Failed: ' + err.message);
    }
  }
};

export default ConnectDB;