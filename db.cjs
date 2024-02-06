const{MongoClient}=require("mongodb")
let db
function connecttodb(call){
    db=MongoClient.connect('mongodb+srv://Gnanesh:SEN211gks@cluster0.mt9rhz2.mongodb.net/Tracker?retryWrites=true&w=majority').then((client)=>{
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
