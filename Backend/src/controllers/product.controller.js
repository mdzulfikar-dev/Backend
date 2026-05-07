import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer"

export const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:5*1024*1024
    }
})

export async function  productController(req, res){
    
    
    




    
   const {title,description, priceAmount, priceCurrency} = req.body

   console.log(req.body)
   console.log(req.files)


   

   

   

  const seller = req.user;
  
  
  
   
      

   
   const images = await Promise.all(req.files.map(async (file)=>{
    return await uploadFile({
        buffer:file.buffer,
        fileName:file.originalname
    })

   }))
   

   const product = await productModel.create({
    title,
    description,
    price:{
        amount:priceAmount,
        currency:priceCurrency || "INR"
    },images,
    seller:seller._id
   })

   

   res.status(201).json({
    message:"Product created successfully",
    success:true,
    product
   })



}

export async function getProductController(req,res){
    const seller = req.user;
    const products =  await productModel.find({
        seller:seller._id
    })

    


    
    res.status(200).json({
        message:"Fetched products successfully",
        success:true,
        products
    })
}