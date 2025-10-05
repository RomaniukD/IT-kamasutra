import { MongoClient } from 'mongodb';

const mongoUri = process.env.mongoURI || "";
export const client = new MongoClient(mongoUri);

export const runDB = async() => {
try {
    await client.connect();
    await client.db("products").command({ping: 1});
    console.log("Successfully conected to mongo server")
} catch {
    console.log("Can't connect do db")
    
    await client.close()
}}