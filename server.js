import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRout from "./routes/authRout.js"
import cors from 'cors';
import createCatController from './routes/catagoryRout.js'
import productRoutes from './routes/productRoutes.js'
import path from 'path'
//database config
dotenv.config();
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

//routes
app.use('/api/v1/auth',authRout)
app.use('/api/v1/catagory',createCatController)
app.use('/api/v1/product',productRoutes)
app.use(express.static(path.join(__dirname, './client/build')))



app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});


// rest api
app.get('/', (req, res)=>{
  res.send()
})
//PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port".bgCyan.white, PORT);
});
// X!V7VN7nFxX!*Xj
