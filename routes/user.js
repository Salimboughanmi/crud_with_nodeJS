const express = require("express")
const router =  express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.post('/register' ,async (req , res)=>{
    data = req.body

    usr = new User(data);
    salt = bcrypt.genSaltSync(10)
    cryptedpass = await bcrypt.hashSync(data.password , salt)
    usr.password = cryptedpass
    usr.save().then(
        (savedUser)=>{
       res.send(savedUser)
    }).catch(
        (err)=> res.status(400).send(err))



})


router.post('/login' ,async (req , res)=>{
    data = req.body

    user = await User.findOne({email: data.email});
    
    if(! user){
        res.status(400).send('email or password invalid !')
    }else{
     validpass = bcrypt.compareSync(data.password , user.password)
    } if (!validpass) {
        res.status(400).send('email or password invalid !')
    } else {
        payload={
            _id : user.id,
            email : user.email,
            name : user.name

        }
     token = jwt.sign(payload ,'12345' ) //payload contient data que je le mettre dans token ; '12345' pour la verification de token quand je besoin un data via token
     res.status(200).send({mytoken :token })
    }

})



//create POST request
router.post('/post' , (req , res)=> {
    data = req.body
    usr = new User(data)
    usr.save().then(
        (savedUser)=>{
       res.send(savedUser)
    }).catch(
        (err)=> res.send(err))
   
}) 


//create POST request with async await
router.post('/postUser' , async (req , res )=> {
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
router.get('/get' , (req , res )=>{
    User.find().then((users)=>{
        res.send(users)
    }
).catch(
        (err)=>{res.send(err)} )
})


//create GET request with Async Await
router.get('/getUser' , async (req , res)=>{
try {
    users = await User.find({ age:30 });
    res.send(users)
    
} catch (error) {
    res.send(error)
} })
 

// Create Get by ID request
router.get('/getbyId/:id' , (req , res)=>{
  myId = req.params.id ;
  User.findById({_id : myId }).then((user)=>{ //findOne = rechercher par name , id , username ...
    res.send(user)
  }).catch((err)=>res.send(err))
})


// Create Get by ID request with Async Await
router.get('/getUserByID/:id' , async (req , res)=>{
try {
    myid = req.params.id
  user = await User.findOne({_id:myid})
  res.send(user)

} catch (error) {
    res.send(error)
}

})


// Create DELETE request 
router.delete('/delete/:id' , (req,res)=>{
    myid =req.params.id
    User.findByIdAndDelete({ _id:myid}).then((userDelete)=>{
     
        res.send(userDelete)
 
    })
      .catch((err)=>{
        res.send(err)
    })
})


//Create DELETE request async Await
router.delete('/deleteUser/:id' , async (req , res)=>{
   try {
    myid = req.params.id
    myuser = await User.findByIdAndDelete({_id : myid})
    res.send(myuser)
   } catch (error) {
    res.send(error)
   }
})


// Create UPDATE request 
router.put('/update/:id' , (req , res)=>{
    myid = req.params.id
    newData = req.body

    User.findByIdAndUpdate({_id : myid} , newData).then((updated)=>{
        res.send(updated)
    }).catch((err)=> res.send(err))
} )


// Create UPDATE request async Await
router.put('/updateUser/:id' ,async (req , res)=>{
    try {
        myid = req.params.id
        newdata = req.body
        user = await User.findByIdAndUpdate({_id : myid} , newdata)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})









module.exports = router