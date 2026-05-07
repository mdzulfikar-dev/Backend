import {Router} from "express"
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import {getProductController, productController} from "../controllers/product.controller.js"
import { upload } from "../controllers/product.controller.js";

const router = Router()


router.post("/",authenticateSeller,upload.array("images",7),productController)

router.get("/seller/getProducts",authenticateSeller,getProductController)

export default router;