const express = require('express');
const dotenv = require("dotenv");
dotenv.config()

const mongoose = require("mongoose")
const routes = require('./controllers/api')

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use('/api', routes);
const start = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`)
    });
};
start()

