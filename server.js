const express = require('express')

//import express from 'express';
require('./config/connect')
const app = express() 

const productRoute = require('./routes/product')
const userRoute = require('./routes/user')

app.use(express.json()) // mettre l'application lire des donner de type json from postman or frontend

//http://127.0.0.1:3000

app.use('/product' , productRoute); //http://127.0.0.1:3000/product   go to product 
app.use('/user' , userRoute);       //http://127.0.0.1:3000/user      go to user
app.use('/getimage' , express.static('assets') )
// for get image use http://127.0.0.1:3000/getimage/1725552989430.png



app.listen(3000 , ()=> {console.log("server work ") ;

})



































