import express from 'express';
import { env } from './config/env';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.json('Hello, World!');
});


app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
})