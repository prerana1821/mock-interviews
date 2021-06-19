import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(
    "mongodb://mock-interviews:mock-interviews@interview-clustor-shard-00-00.8woww.mongodb.net:27017,interview-clustor-shard-00-01.8woww.mongodb.net:27017,interview-clustor-shard-00-02.8woww.mongodb.net:27017/database?ssl=true&replicaSet=atlas-ixai5r-shard-0&authSource=admin&retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
