const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require('./Routes/userRouter')
const productRouter = require('./Routes/productRouter')
require('./database/connection.js')
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.get('/', (req, res) => {
    res.send("Server is running");
});
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});