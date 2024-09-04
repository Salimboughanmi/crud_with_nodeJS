const express = require('express')

//import express from 'express';
require('./config/connect')
const app = express() 
app.use(express.json()) // mettre l'application lire des donner de type json from postman or frontend

















app.listen(3000 , ()=> {console.log("server work :)")})



































