import express from 'express';
import { env } from './config/env';
import cors from 'cors';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import commentRoute from './routes/commentRoute';
import cookieParser from "cookie-parser";

import path from "path";


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());

app.get('/check', (req, res) => {
    res.json({
        message: "WellCome to Product Store",
        points: {
            users: "/api/users",
            products: " /api/products",
            comments: "/api/comments",
        }
    })
});


app.use("/api/users", userRoute);

app.use("/api/products", productRoute);

app.use("/api/comments", commentRoute);

// Multer errors (Unexpected field, file too large, etc.) -> return friendly 400
import { MulterError } from 'multer';
app.use((err: any, req: any, res: any, next: any) => {
    if (err instanceof MulterError) {
        console.error('Multer error:', err.message);
        return res.status(400).json({ message: err.message });
    }
    return next(err);
});


/// For frontrend and backend in one link

if (env.NODE_ENV === 'production') {
    const __dirname = path.resolve();

    // server static folder run

    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}



app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
})