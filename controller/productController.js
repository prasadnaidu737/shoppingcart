
const {getAllProd,insertReocord,deleteProd,updateRec}=require("../model/productModel")

async function getAllProdcuts(){
const result = await getAllProd()
return result
}

async function insertData(body){
const result=await insertReocord(body)
return result
}

async function deleteData(id) {
  const result = await deleteProd(id);
  return result;
}

async function updateData(body) {
  const result = await updateRec(body);
  return result;
}






module.exports = { getAllProdcuts, insertData, deleteData, updateData };