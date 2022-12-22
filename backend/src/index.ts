import * as dotenv from "dotenv";

dotenv.config();
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

import express from "express";
import cors from "cors";
import helmet from "helmet";
import prisma from "models/prisma.model";
import routes from "routes/routes";
import errorHandler from "routes/handlers";

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

// console.log(process.env.DATABASE_URL || "no db url");

const app = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.get("/api", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

// app.get(["/", "/:name"], (req, res) => {
//   const greeting = "<h1>Hello From Node on Fly!</h1>";
//   const name = req.params["name"];
//   console.log("my route");
//   if (name) {
//     res.send(greeting + "</br>and hello to " + name);
//   } else {
//     res.send(greeting);
//   }
// });

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log(`Backend listening on port ${port}!`));
