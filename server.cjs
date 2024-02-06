const express=require('express')
const bodyparser=require('body-parser')
const {connecttodb,getdb}=require('./db.cjs')
const app = express()
connecttodb((error)=>{
    if(error){
        console.log("Error in connecting to database")
        console.log(error)
    }else{
    app.listen(7000)
    get= getdb()
    console.log("running in  port 7000")
    }
})
app.use(bodyparser.json)

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
