import express from "express";
import cors from "cors";
import "dotenv/config";

// app config
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});