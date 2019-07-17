const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const httpProxy = require('http-proxy'); 
const apiProxy = httpProxy.createProxyServer();
const bookingsUrl = "http://localhost:3000",
      relatedListingsUrl = "http://localhost:3001",
      galleryContainerUrl = "http://localhost:1128";

const app = express();

app.use(morgan('dev'));
app.use(morgan(':method :url :status :res[content-length] - :response-time MS'));

app.use('/:id', express.static(__dirname + '/../client/dist'));

app.use(bodyParser());

app.get('/rooms/bookings/listings/:id', (req,res) => {
    apiProxy.web(req,res, {target: bookingsUrl});
});

app.get('/rooms/bookings/dates/:month', (req, res) => {
    apiProxy.web(req,res,{target: bookingsUrl});
});

app.get('/rooms/bookings/listing_dates', (req,res) => {
    apiProxy.web(req,res,{target: bookingsUrl});
});


//BELOW IS RELATED LISTINGS
app.get('/rooms/related-listings', (req,res) => {
    apiProxy.web(req,res,({target: relatedListingsUrl}));
});

//BELOW IS GALLERY CONTAINER MODULE
app.get('/images/:houseId', (req,res) => {
    apiProxy.web(req,res,({target: galleryContainerUrl}));
});


const PORT = 1111;


// app.get('/bookings', (req, res) => {
//     //FETCH BUNDLLE JS USING ABSOLUTE PATH FOR NOW TO BOOKINGS BUNDLE.JS
//     res.sendFile('')
// });

app.listen(PORT, () => {
    console.log(`PROXY SERVER RUNNING ON PORT : ${PORT} `);
});
