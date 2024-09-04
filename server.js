const express = require('express')
const User = require('./models/user')
const Product = require('./models/product')
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
app.post('/postUser' , async (req , res )=> {
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
app.get('/get' , (req , res )=>{
    User.find().then((users)=>{
        res.send(users)
    }
).catch(
        (err)=>{res.send(err)} )
})


//create GET request with Async Await
app.get('/getUser' , async (req , res)=>{
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


//Create DELETE request async Await
app.delete('/deleteUser/:id' , async (req , res)=>{
   try {
    myid = req.params.id
    myuser = await User.findByIdAndDelete({_id : myid})
    res.send(myuser)
   } catch (error) {
    res.send(error)
   }
})


// Create UPDATE request 
app.put('/update/:id' , (req , res)=>{
    myid = req.params.id
    newData = req.body

    User.findByIdAndUpdate({_id : myid} , newData).then((updated)=>{
        res.send(updated)
    }).catch((err)=> res.send(err))
} )


// Create UPDATE request async Await
app.put('/updateUser/:id' ,async (req , res)=>{
    try {
        myid = req.params.id
        newdata = req.body
        user = await User.findByIdAndUpdate({_id : myid} , newdata)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

/*  *****************************         CRUD PRODUCT       ********************** */

//create POST request
app.post('/postProduct' , (req , res)=>{
    data = req.body
    prod = new Product(data)
    prod.save().then(
        (savedprod)=>{
        res.status(200).send(savedprod)
    }).catch((err)=> res.status(400).send(err))
    

})


//create POST request with async await
app.post('/productPost' , async (req , res)=>{
  try {
    data = req.body
    prod = new Product(data)
    prodsaved = await prod.save()
    res.status(200).send(prodsaved)
    
    
  } catch (error) {
    res.status(400).send(error)
  }
})


//create GET request
app.get('/getProd' , (req , res)=>{
   //myid = req.params.id
   Product.find().then((prod)=>{
    res.status(200).send(prod)
   }
).catch((err)=>{
      res.status(400).send(err)
   })
})

//create GET request with Async Await
app.get('/getproduct', async (req , res)=>{
    try {
      
        prod = await Product.find();
        res.send(prod)
        
    } catch (error) {
        res.send(error)
    } })
     
    
    // Create Get by ID request
    app.get('/getproductId/:id' , (req , res)=>{
      myId = req.params.id ;
      Product.findById({_id : myId }).then((prod)=>{ //findOne = rechercher par name , id , username ...
        res.send(prod)
      }).catch((err)=>res.send(err))
    })
    
    
    // Create Get by ID request with Async Await
    app.get('/getmyprodByID/:id' , async (req , res)=>{
    try {
        myid = req.params.id
      prod = await Product.findOne({_id:myid})
      res.status(200).send(prod)
    
    } catch (error) {
        res.status(400).send(error)
    }
    
    })
    
    
    // Create DELETE request 
    app.delete('/deleteprod/:id' , (req,res)=>{
        myid =req.params.id
        Product.findByIdAndDelete({ _id:myid}).then((prodDelete)=>{
         
            res.send(prodDelete)
     
        })
          .catch((err)=>{
            res.send(err)
        })
    })
    
    
    //Create DELETE request async Await
    app.delete('/deletemyProduct/:id' , async (req , res)=>{
       try {
        myid = req.params.id
        prodDelete = await User.findByIdAndDelete({_id : myid})
        res.send(prodDelete)
       } catch (error) {
        res.send(error)
       }
    })
    
    
    // Create UPDATE request 
    app.put('/updateprod/:id' , (req , res)=>{
        myid = req.params.id
        newData = req.body
    
        Product.findByIdAndUpdate({_id : myid} , newData).then((updated)=>{
            res.send(updated)
        }).catch((err)=> res.send(err))
    } )
    
    
    // Create UPDATE request async Await
    app.put('/updateMyprod/:id' ,async (req , res)=>{
        try {
            myid = req.params.id
            newdata = req.body
            prod = await Product.findByIdAndUpdate({_id : myid} , newdata)
            res.status(200).send(prod)
        } catch (error) {
            res.status(400).send(error)
        }
    })

















app.listen(3000 , ()=> {console.log("server work :)")})



































