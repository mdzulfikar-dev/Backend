import productModel from "../models/product.model.js";
// import { uploadFile } from "../services/storage.service.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer"

export const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fieldSize:5*1024*1024
    }
})

export async function  productController(req, res){
    // console.log(req.user)
    // console.log(req.body)
    // console.log(req.file)
    
    




    
   const {title,description, priceAmount, priceCurrency} = req.body

   console.log(req.body)

  const seller = req.user;
  console.log(req.file)
  
   
      
/*
   
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


*/
}