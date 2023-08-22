import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import contactRouter from "./router/contactRouter.js";
import contactAppRouter from "./router/contactAppRouter.js";

const app = express();
//config env
dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT;
const hostName = process.env.HOST_NAME;
const mongo_url = process.env.MongoDB_URL;
//enable client access point CORS
app.use(cors());
//http logger
app.use(morgan("tiny"));
//reading form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//connecting mongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(mongo_url)
  .then((response) => {
    console.log("MongoDB connected successfully...");
  })
  .catch((err) => {
    console.log(err);
  });
//API router
app.get("/", (req, resp) => {
  resp.send("<h1>E-hub server is running successfully...</h1>");
});
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/contact", contactRouter);

// This Api is for Contact app not for E-hub
app.use("/contact-app", contactAppRouter);

//serving the frontend  for cyclic deployment
// app.use(express.static("./client/build"))

// app.get("/", (req, resp) => {
//     resp.sendFile(
//        ( "./client/build/index.html"),
//         (err) => {
//             resp.status(500).send(err)
//         }
//     )
// })
console.log("hello");
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running successfully on http://${hostName}:${port}`);
});

// commit1

// commit2
