import mongoose, { mongo } from "mongoose";

async function conectaNaDataBase() {
  mongoose.connect(process.env.CONNECTMONGO)

  return mongoose.connection;
}


export default conectaNaDataBase;
