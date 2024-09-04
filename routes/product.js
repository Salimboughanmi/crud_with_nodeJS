const express = require("express")
const router =  express.Router()
const Product = require('../models/product')

/*  *****************************         CRUD PRODUCT       ********************** */

//create POST request
router.post('/postProduct' , (req , res)=>{
    data = req.body
    prod = new Product(data)
    prod.save().then(
        (savedprod)=>{
        res.status(200).send(savedprod)
    }).catch((err)=> res.status(400).send(err))
    

})


//create POST request with async await
router.post('/productPost' , async (req , res)=>{
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
router.get('/getProd' , (req , res)=>{
   //myid = req.params.id
   Product.find().then((prod)=>{
    res.status(200).send(prod)
   }
).catch((err)=>{
      res.status(400).send(err)
   })
})

//create GET request with Async Await
router.get('/getproduct', async (req , res)=>{
    try {
      
        prod = await Product.find();
        res.send(prod)
        
    } catch (error) {
        res.send(error)
    } })
     
    
    // Create Get by ID request
    router.get('/getproductId/:id' , (req , res)=>{
      myId = req.params.id ;
      Product.findById({_id : myId }).then((prod)=>{ //findOne = rechercher par name , id , username ...
        res.send(prod)
      }).catch((err)=>res.send(err))
    })
    
    
    // Create Get by ID request with Async Await
    router.get('/getmyprodByID/:id' , async (req , res)=>{
    try {
        myid = req.params.id
      prod = await Product.findOne({_id:myid})
      res.status(200).send(prod)
    
    } catch (error) {
        res.status(400).send(error)
    }
    
    })
    
    
    // Create DELETE request 
    router.delete('/deleteprod/:id' , (req,res)=>{
        myid =req.params.id
        Product.findByIdAndDelete({ _id:myid}).then((prodDelete)=>{
         
            res.send(prodDelete)
     
        })
          .catch((err)=>{
            res.send(err)
        })
    })
    
    
    //Create DELETE request async Await
    router.delete('/deletemyProduct/:id' , async (req , res)=>{
       try {
        myid = req.params.id
        prodDelete = await User.findByIdAndDelete({_id : myid})
        res.send(prodDelete)
       } catch (error) {
        res.send(error)
       }
    })
    
    
    // Create UPDATE request 
    router.put('/updateprod/:id' , (req , res)=>{
        myid = req.params.id
        newData = req.body
    
        Product.findByIdAndUpdate({_id : myid} , newData).then((updated)=>{
            res.status(200).send(updated)
        }).catch((err)=> res.status(400).send(err))
    } )
    
    
    // Create UPDATE request async Await
    router.put('/updateMyprod/:id' ,async (req , res)=>{
        try {
            myid = req.params.id
            newdata = req.body
            prod = await Product.findByIdAndUpdate({_id : myid} , newdata)
            res.status(200).send(prod)
        } catch (error) {
            res.status(400).send(error)
        }
    })


module.exports = router