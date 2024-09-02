const express = require('express')
const User = require('./models/user')
//import express from 'express';
require('./config/connect')
const app = express() 
app.use(express.json()) // application lire des donner de type json from postman or frontend

app.get('/get' , ()=>{console.log("get work")})


/* app.post('/post' , (req , res)=> {
    data = req.body
    usr = new User(data)
    usr.save().then(
        (savedUser)=>{
       res.send(savedUser)
    }).catch(
        (err)=> res.send(err))
   
}) */


app.post('/create' , async (req , res )=> {
    try {
        data = req.body
        usr = new User(data)
       userSaved = await usr.save()
       res.send(userSaved)
    } catch (error) {
        res.error
    }
})

























app.put('/put' , ()=> console.log('put work'))


app.delete('/delete' , ()=>console.log ('delete work'))



app.listen(3000 , ()=> {console.log("server work :)")})



































