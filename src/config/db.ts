import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.DATABASE_URL;
        console.log(`URI: ${uri}`);
        
        // const uri = "mongodb+srv://smpn1-sidoharjo:Sragenasri12@cluster0.hbxy2hc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        if (!uri) throw new Error("DATABASE_URL is not defined in .env");

        await mongoose.connect(uri);
        console.log("✅ Database connected");
    } catch (error) {
        console.error("❌ DB connection error:", error);
        throw error;
    }
};
