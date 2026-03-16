import "dotenv/config";
import cors from "cors";
import express from "express";

import models from "./models";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

app.get("/", (req, res) => {
  res.send(
    "Received a GET HTTP method\nServidor rodando!\n" + process.env.MESSAGE,
  );
});

const port = process.env.PORT ?? 3000;

app.listen(port, () =>
  console.log(
    "Express-01 app listening on port " + port + "!\n" + process.env.MESSAGE,
  ),
);

export default app;
