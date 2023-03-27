import express from "express";
import cors from "cors";
import taskRoute from "./routes/task.js";

const app = express();
const port = 5000;

//MIDDLEWARES
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/task", taskRoute);

app.listen(port, () => {
  console.log(`App is listening on port ${port}..`);
});
