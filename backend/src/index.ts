import express from 'express';
import { env } from './config/env';
import cors from 'cors';
import userRoute from '../src/routes/userRoute';
import productRoute from '../src/routes/productRoute';
import commentRoute from '../src/routes/commentRoute';
import cookieParser from "cookie-parser";
import { checkValiditi } from './middleware.ts/checkValidUser';




const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
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





app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
})