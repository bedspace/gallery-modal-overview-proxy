const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(morgan(':method :url :status :res[content-length] - :response-time MS'));

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser());

const PORT = 1111;


// app.get('/bookings', (req, res) => {
//     //FETCH BUNDLLE JS USING ABSOLUTE PATH FOR NOW TO BOOKINGS BUNDLE.JS
//     res.sendFile('')
// });

app.listen(PORT, () => {
    console.log(`PROXY SERVER RUNNING ON PORT : ${PORT} `);
});
