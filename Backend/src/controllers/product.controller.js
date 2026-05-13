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
    
    
    




    
//    const {title,description, priceAmount, priceCurrency} = req.body
   const {title,description, priceAmount, amountCurrency} = req.body

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
        currency:amountCurrency || "INR"
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

export async function getAllProducts(req,res){
    const products = await productModel.find();
    return res.status(200).json({
        message:"Products fetched successfully",
        success:true,
        products
    })

}


export async function getProductDetails(req,res){
    
    const {productId} = req.params;
    console.log(productId)

    const product = await productModel.findById(productId);

    if(!product){
        return res.status(200).json({
            message:"Product not found",
            success:false
        })
    }

    return res.status(200).json({
        message:"Product details fetched successfully",
        product
    })
}



export async  function createProductVariant(req,res){
   
    try {
        console.log(`The id: ${req.params.productId}`)
         const productId = req.params.productId
    const product = await productModel.findOne({
        _id:productId,     // the product check id
        seller: req.user._id   // chech which seller send the req for creating variant
    })
    if(!product){
        return res.status(404).json({
            message:"Product not found"
        })
       

    }
    

    //VARIANT IMAGE UPLOAD
    //variant images upload on imagekit
     const files = req.files || [];
     const images = [] //seller send the image of variant and send in the imagekit and then url inside the images
     if(files.length > 0){
        //promise.all parallely upload the files of the variant on imagekit
      const uploadedImages =   await Promise.all(files.map(async(file)=>{
            const image = await uploadFile({
                buffer:file.buffer,
                fileName:file.originalname


            })
            return image
            

        }))
        images.push(...uploadedImages)


     }
     

     // BODY DATA

     

    //  const price  = req.body.priceAmount

    const price = {
   amount: req.body.priceAmount,
   currency: "INR"
}
     
    
     
     const stock = req.body.stock
     
     const attributes = JSON.parse(req.body.attributes || "{}")

     

    

     // creating variant object

     const variant = {
        attributes,
        price,
        stock,
        images
     }

     console.log("Hii")
     
     console.log("Hello")


     // Push variant
     product.variants.push(variant)

     await product.save()

     console.log(`The product is: ${product}`)
     


     return res.status(201).json({
        success:true,
        message: "Variants created successfully",
        variant
     })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
    
    

    
    
    
