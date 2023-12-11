import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import userRouter from "./router/userRouter.js";
import productRouter from "./router/productRouter.js";
import contactRouter from "./router/contactRouter.js";
import contactAppRouter from "./router/contactAppRouter.js";
import bodyParser from "body-parser";

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
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
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

// *********************************************************************
// Separate app Toll Calculator
// TollGuru API Key
// const xApiKay = "8b8pDP74r74JBqMmqd33MdHNqPr3jbJ3";
const xApiKay = "NqNBrh7FbL8Br97qTnNQMR8TdggfTGQg";
app.post("/toll-guru-api", async (req, resp) => {
  try {
    console.log(req.body);
    const response = await fetch(
      "https://apis.tollguru.com/toll/v2/origin-destination-waypoints",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": xApiKay,
        },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();
    console.log(data);
    resp.status(200).json({
      result: "Data Successfully fetched...",
      tollData: data,
    });
  } catch (err) {
    console.log(err);
  }
});
//************************************************************************** */

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running successfully on http://${hostName}:${port}`);
});
