const express = require('express')
const User = require('./models/user')
//import express from 'express';
require('./config/connect')
const app = express() 
app.use(express.json()) // application lire des donner de type json from postman or frontend


 app.post('/post' , (req , res)=> {
    data = req.body
    usr = new User(data)
    usr.save().then(
        (savedUser)=>{
       res.send(savedUser)
    }).catch(
        (err)=> res.send(err))
   
}) 


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


app.get('/getall' , (req , res )=>{
    User.find().then((users)=>{
        res.send(users)
    }
).catch(
        (err)=>{res.send(err)} )
})


app.get('/all' , async (req , res)=>{
try {
    users = await User.find({ age:30 });
    res.send(users)
    
} catch (error) {
    res.send(error)
} })
 

app.get('/getbyId/:id' , (req , res)=>{
  myId = req.params.id ;
  User.findById({_id : myId }).then((user)=>{ //findOne = rechercher par name , id , username ...
    res.send(user)
  }).catch((err)=>res.send(err))
})



















app.put('/put' , ()=> console.log('put work'))


app.delete('/delete' , ()=>console.log ('delete work'))



app.listen(3000 , ()=> {console.log("server work :)")})



































