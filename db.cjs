const{MongoClient}=require("mongodb")
let db
function connecttodb(call){
    db=MongoClient.connect('mongodb://localhost:27017/DivineDB').then((client)=>{
        db=client.db()
        call()
    }).catch((error)=>{
        call(error)
    })
}
function getdb(){
    return db
}
module.exports={connecttodb,getdb}