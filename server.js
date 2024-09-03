const express = require('express')
const User = require('./models/user')
//import express from 'express';
require('./config/connect')
const app = express() 
app.use(express.json()) // mettre l'application lire des donner de type json from postman or frontend


//create POST request
 app.post('/post' , (req , res)=> {
    data = req.body
    usr = new User(data)
    usr.save().then(
        (savedUser)=>{
       res.send(savedUser)
    }).catch(
        (err)=> res.send(err))
   
}) 


//create POST request with async await
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


//create GET request
app.get('/getall' , (req , res )=>{
    User.find().then((users)=>{
        res.send(users)
    }
).catch(
        (err)=>{res.send(err)} )
})


//create GET request with Async Await
app.get('/all' , async (req , res)=>{
try {
    users = await User.find({ age:30 });
    res.send(users)
    
} catch (error) {
    res.send(error)
} })
 

// Create Get by ID request
app.get('/getbyId/:id' , (req , res)=>{
  myId = req.params.id ;
  User.findById({_id : myId }).then((user)=>{ //findOne = rechercher par name , id , username ...
    res.send(user)
  }).catch((err)=>res.send(err))
})


// Create Get by ID request with Async Await
app.get('/getUserByID/:id' , async (req , res)=>{
try {
    myid = req.params.id
  user = await User.findOne({_id:myid})
  res.send(user)

} catch (error) {
    res.send(error)
}

})


// Create DELETE request 
app.delete('/delete/:id' , (req,res)=>{
    myid =req.params.id
    User.findByIdAndDelete({ _id:myid}).then((userDelete)=>{
     
        res.send(userDelete)
 
    })
      .catch((err)=>{
        res.send(err)
    })
})

















app.put('/put' , ()=> console.log('put work'))


app.delete('/delete' , ()=>console.log ('delete work'))



app.listen(3000 , ()=> {console.log("server work :)")})



































