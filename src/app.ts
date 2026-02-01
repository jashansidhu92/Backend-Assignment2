import express from "express";
import morgan from "morgan";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", ticketRoutes);

export default app;

