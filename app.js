import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import contactRouter from "./routes/contactRouter.js";
import contactAppRouter from "./routes/contactAppRouter.js";
import authRoutes from './routes/auth.js';
import tollGuruAPI from './controllers/tollGuruController.js';
import connectDB from './utils/db.js';
import configureMiddleware from './middleware/middleware.js';
import authenticate from "./middleware/authenticate.js";
import blogRouter from "./routes/blogRouter.js";

const app = express();
//config env
dotenv.config({ path: ".env" });
const port = process.env.PORT;
const hostName = process.env.HOST_NAME;
const mongo_url = process.env.MongoDB_URL;

// Connect to MongoDB
connectDB(mongo_url);

// Set up middleware
configureMiddleware(app);
// Auth routes
app.use('/api/auth', authRoutes);

// Ehub routes
app.use("/user", authenticate, userRouter);
app.use("/product", authenticate, productRouter);
app.use("/contact", authenticate, contactRouter);

// This Api is for Contact app
app.use("/contact-app", authenticate, contactAppRouter);

// Separate app Toll Calculator
app.post('/toll-guru-api', tollGuruAPI);

// Karkuv.com routes
app.use('/api/blog', authenticate, blogRouter);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running successfully on http://${hostName}:${port}`);
});
