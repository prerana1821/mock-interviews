import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.LOCAL_MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
