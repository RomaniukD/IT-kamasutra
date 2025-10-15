import { MongoClient } from 'mongodb';

const mongoUri = 'mongodb+srv://dbUser:dbUser@cluster0.dkayd4d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
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