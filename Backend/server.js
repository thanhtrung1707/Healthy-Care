import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import connectDatabase from './config/MongoDB.js';
import ImportData from './DataImport.js';
import { errorHandler, notFound } from './Middleware/Errors.js';
import categoryRouter from './Routes/CategoryRoutes.js';
import orderRouter from './Routes/OrderRoutes.js';
import productRouter from './Routes/ProductRoutes.js';
import uploadRouter from './Routes/UploadRoutes.js';
import userRouter from './Routes/UserRoutes.js';
import googleRouter from './Routes/GoogleRoutes.js'
import cors from 'cors';
import passport from './passport.js';
import session from 'express-session';


dotenv.config();
connectDatabase();
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(
  session({
    secret: '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',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// API routes
app.use('/api/import', ImportData);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/auth/google',googleRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
