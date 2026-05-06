import {Router} from "express"
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import {productController} from "../controllers/product.controller.js"
// import {createProductValidator } from  "../validator/product.validator.js"
// import { uploadFile } from "../services/storage.service.js";

import { upload } from "../controllers/product.controller.js";


// import multer from "multer"
// const storage = multer.memoryStorage();
// const upload = multer({
    // storage:multer.memoryStorage()
    
// ,
// limits:{
    // fileSize:5*1024*1024,   // 5MB
// }})


const router = Router()

// router.post("/",authenticateSeller,createProductValidator,upload.array("images",7) ,productController)
router.post("/",authenticateSeller,upload.single("images"),productController)

export default router;