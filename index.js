//I import required packages
const express = require('express');
const dotenv = require("dotenv");
dotenv.config()

const mongoose = require("mongoose")
const routes = require('./controllers/api')

//This suppresses deprecation warnings in the terminal.
mongoose.set("strictQuery", true);

//This sets up the app and connects to the port.
const PORT = process.env.port || 3001;
const app = express();

//This is middleware
app.use(express.json());
app.use('/api', routes);
//This connects to mongoDB and starts the application.
const start = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`)
    });
};
start()

