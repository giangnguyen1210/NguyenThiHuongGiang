import express from "express";
import userRoutes from "./routes/user.routes";
import { connectDB } from "./config/data-source";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

connectDB();

export default app;