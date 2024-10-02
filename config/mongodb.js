import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.mongoUri;

const client = new MongoClient(uri);

export default client;