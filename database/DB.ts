import mongoose, { ConnectOptions } from 'mongoose';

const DB = async () =>
  await mongoose
    .connect(`${process.env.DATABASE_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log(`DATABASE CONNECTED SUCCESSFULLY :)`))
    .catch((err) =>
      console.log(`DATABASE CONNECTION FAILED :( ${err.message}`)
    );

export default DB;
