// index.ts
import express from "express";
import dotenv from "dotenv";
import authRoutes from "@routes/auth.route";
import {connectDB} from "@lib/db";
import {consoleLogSuccess} from "@constants/constants"; // Adjust path as needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Allow to extract the json data out of the body

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    consoleLogSuccess(`Server started on port ${PORT}`);
    connectDB(); // This is where the undefined URI error actually occurs.
})
