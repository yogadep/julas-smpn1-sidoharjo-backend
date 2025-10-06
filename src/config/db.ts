import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.DATABASE_URL;
        console.log(`URI: ${uri}`);

        if (!uri) throw new Error("DATABASE_URL is not defined in .env");

        await mongoose.connect(uri);
        console.log("✅ Database connected");
    } catch (error) {
        console.error("❌ DB connection error:", error);
        throw error;
    }
};
