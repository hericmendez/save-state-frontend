import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://hericmendes:JrV7MWrVdSaHQK7w@cluster0.3ssy3.mongodb.net/save-state-db?retryWrites=true&w=majority&appName=Cluster0'

if (!MONGODB_URI) throw new Error("Defina DATABASE_URL no .env");

let cached = global.mongoose || { conn: null, promise: null };
console.log("cached ==> ", cached);

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
