const express=require('express')
const bodyparser=require('body-parser')
const {connecttodb,getdb}=require('./db.cjs')
const {ObjectId} =require('mongodb')
const app = express()
connecttodb((error)=>{
    if(error){
        console.log("Error in connecting to database")
        console.log(error)
    }else{
        const port =process.env.port || 7000
        app.listen(port)
        get= getdb()
        console.log(`Listening on port ${port}...`)
        }
})
app.use(bodyparser.json())

app.get('/',((req,res) =>{
    res.send("Done...")
}))
app.post('/detail',(req,res)=>{
    get.collection('Practice').insertOne(req.body).then(()=>{
        res.status(201).json({
            "Status":"Done"
        })
    }).catch(()=>{
        res.status(501).json({
            "Status":"Error Occured"
        })
    })
})
app.get('/get', function(req, res) {
    // Declaring an empty array
    const entries = []
    get.collection('Practice')
    .find()////////////////for sort an array by individual is ------------>.find({"Amount" : -5000})
    .forEach(entry => entries.push(entry))
    .then(function() {
        res.status(200).json(entries)
    }).catch(function() {
        res.status(500).json({
            "status" : "Error Occured"
        })
    })
})
//////////////request.query.id----------->insterd of this use id num
app.delete('/delete', function(request, response) {
    if(ObjectId.isValid(request.query.id)) {
        get.collection('Practice').deleteOne({
            _id : new ObjectId(request.query.id)
        }).then(function() {
            response.status(200).json({
                "status" : "Done"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Error Occured"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})
///////request.params.id ----->insterd of this use id num
app.patch('/update/:id', function(request, response) {
    if(ObjectId.isValid(request.params.id)) {
        get.collection('Practice').updateOne(
            { _id : new ObjectId(request.params.id) }, // identifier : selecting the document which we are going to update
            { $set : request.body } // The data to be updated
        ).then(function() {
            response.status(200).json({
                "status" : "Done"
            })
        }).catch(function() {
            response.status(500).json({
                "status" : "Error Occured"
            })
        })
    } else {
        response.status(500).json({
            "status" : "ObjectId not valid"
        })
    }
})

