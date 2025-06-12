// index.ts
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.ts";
import {connectDB} from "./lib/db.ts";

dotenv.config();

// *** DEBUG LOGS HERE ***
console.log('--- ENV Debugging ---');
console.log('Current Working Directory:', process.cwd());
console.log('Value of MONGODB_URI from process.env:', process.env.MONGODB_URI);
console.log('--- End ENV Debugging ---');


const app = express();
const PORT = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
    connectDB(); // This is where the undefined URI error actually occurs.
})