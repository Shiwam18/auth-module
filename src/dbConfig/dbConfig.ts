import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connection', ()=>{
            console.log("mongo-db connected");
        })
        connection.on('error', (error)=>{
            console.log('mongo-db connection error' +error);
            process.exit();
        })
    } catch (error) {
        console.log(error, "something went wrong in connection with db");
    }
    
}