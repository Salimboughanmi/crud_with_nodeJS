const express = require('express')
//import express from 'express';
const app = express()

app.get('/get' , ()=>{console.log("get work")})
app.post('/post' , ()=> console.log("post work"))
app.put('/put' , ()=> console.log('put work'))
app.delete('/delete' , ()=>console.log ('delete work'))



app.listen(3000 , ()=> {console.log("server work :)")})



































