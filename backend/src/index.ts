// index.ts
import express from "express";
import dotenv from "dotenv";
import authRoutes from "@routes/auth.route";
import {connectDB} from "@lib/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
    connectDB(); // This is where the undefined URI error actually occurs.
})