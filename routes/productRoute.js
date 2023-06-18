const express=require("express")
const productRouter=express.Router()
const {
  getAllProdcuts,
  insertData,
  deleteData,
  updateData,
} = require("../controller/productController");

productRouter.get("/",async(req,res)=>{
const result= await getAllProdcuts()
res.json(result)
})

productRouter.post("/",async(req,res)=>{
    const result= await insertData(req.body)
    res.json(result)
})

productRouter.delete("/:id",async(req,res)=>{
    const result= await deleteData(req.params.id)
    res.json(result)
})

productRouter.put("/",async(req,res)=>{
    const result=await updateData(req.body)
    res.json(result)
})

module.exports=productRouter