const express = require('express');
const dotenv = require('dotenv').config();
const connectMongoose = require('./mongo/mongoconfig/db')
const port = 8000

const app = express();

app.listen(port)

connectMongoose();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/pianos',require('./routes/pianoRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/purchases',require('./routes/purchaseRoutes'));
app.use('/api/messages',require('./routes/contactMsgRoutes'));


