import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://andresnicolasturko:uGvy8LfZaYgLbeex@clusterdb.yjswy.mongodb.net/?retryWrites=true&w=majority&appName=Clusterdb";

const client = new MongoClient(uri);

export default client;