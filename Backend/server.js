import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import connectDatabase from "./config/MongoDB.js";
import ImportData from "./DataImport.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import categoryRouter from "./Routes/CategoryRoutes.js";
import orderRouter from "./Routes/OrderRoutes.js";
import productRouter from "./Routes/ProductRoutes.js";
import uploadRouter from "./Routes/UploadRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import cors from 'cors';
import passport from "./passport.js";
import session from 'express-session';
import GoogleRoutes from './Routes/GoogleRoutes.js';

dotenv.config();
connectDatabase();
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials such as cookies, authorization headers
    optionsSuccessStatus: 204, // Set the status for successful preflight requests (204 - No Content)
};

app.use(cors(corsOptions));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

// API routes
app.use("/api/import", ImportData);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/google", GoogleRoutes);

app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
