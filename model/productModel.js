const{MongoClient}=require("mongodb")

const url = "mongodb://localhost:27017";

const dbName="test"

const client=new MongoClient(url)

async function getAllProd(){
     try {
       await client.connect();
       console.log("connected to db")

          const db = client.db(dbName);
          const collectionName = db.collection("product");
          var cursor = collectionName.find(); // return all the docs
          var productsArr = [];
          productsArr = await cursor.toArray();
        //   console.log("Products Array ", productsArr);
          client.close();

          return productsArr;
     } catch (error) {
       console.log(error);
     }
}

async function insertReocord(body){
try {
  await client.connect();
  console.log("connected to db");

  const db = client.db(dbName);
  const collectionName = db.collection("product");
  var cursor = collectionName.find(); // return all the docs
  var productsArr = [];
  productsArr = await cursor.toArray();
   
const pos = productsArr.findIndex((item) => item.empId==body.empId);
if(pos>=0){
    return "Employee Id to be inserted already exists";
}
else{

    var dataInserted=collectionName.insertOne(body)

    console.log("inserted")

    return dataInserted

}

} catch (error) {
  console.log(error);
}

}


async function deleteProd(id) {
    newId=parseInt(id)
  try {
    await client.connect();
    console.log("connected to db");

    const db = client.db(dbName);
    const collectionName = db.collection("product");
    var cursor = collectionName.find(); // return all the docs
    var productsArr = [];
    productsArr = await cursor.toArray();
const pos = productsArr.findIndex((item) => item.empId == newId);

if(pos>=0){
    let result = await collectionName.deleteOne({ empId: newId });
    console.log(result)
    return result
}else{
    return "empId doesn't exists"
}
  } catch (error) {
    console.log(error);
  }
}



async function updateRec(body){
     try {
       await client.connect();
       console.log("connected to db");
       console.log(body)
     const id=parseInt(body.empId)
     const sal=parseInt(body.salary)
       const db = client.db(dbName);
       
       const collectionName = db.collection("product");
       const filterDoc={empId:id}
       const updateDoc={$set:{salary:sal}}
    
       var result = await collectionName.updateOne(filterDoc,updateDoc,{upsert:true});
    //    var productsArr = [];
    //    productsArr = await cursor.toArray();
       //   console.log("Products Array ", productsArr);
       client.close();

       return result;
     } catch (error) {
       console.log(error);
     }

}


module.exports = { getAllProd, insertReocord, deleteProd, updateRec };