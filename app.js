import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import productsRouter from "./routes/productsRouter.js";

dotenv.config();

const app = express();

mongoose
.connect(process.env.NODE_MONGOOSE)
.then(() => {
  console.log("Database connection successful");
})
.catch((error) => {
  console.log(error);
  process.exit(1);
});

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use("/api/products", productsRouter);
// app.use("/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
