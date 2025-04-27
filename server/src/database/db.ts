import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL!); // MONGO_URL in dotenv to connect to database
        console.log("Database connected");
    } catch (error: any) {
        console.log(error);
    }
}

export default connectDB;