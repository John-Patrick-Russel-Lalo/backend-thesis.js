import 'dotenv/config';
import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();

app.use(
  session({
    name: 'sessionId',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true
  })
);



app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

export default app;