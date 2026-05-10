import {Router} from "express"
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import {getAllProducts, getProductController, productController, getProductDetails} from "../controllers/product.controller.js"
import { upload } from "../controllers/product.controller.js";
import { createProductValidator } from "../validator/product.validator.js";


const router = Router()

/**
 * @route POST /api/products
 * @description Create a new product
 * @access Private [seller only]
 */
router.post("/",authenticateSeller,upload.array("images",7),createProductValidator,productController)

/**
 * @routes GET /api/products/seller
 * @description Get all the products of the authenticated seller
 * @access Private [Seller only]
 */

router.get("/seller/getProducts",authenticateSeller,getProductController)

/**
 * @routes GET /api/produts/getproducts
 * @dscription Get all products
 * @access Public
 */
router.get("/getproducts",getAllProducts)


/**
 * @routes GET /api/products/detail/:productId
 * @description Get the specific product whose id is passed inside the params
 * @access Public
 */

router.get("/detail/:productId",getProductDetails)



export default router;