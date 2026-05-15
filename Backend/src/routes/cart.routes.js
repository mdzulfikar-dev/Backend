import express from "express"
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validator/cart.validator.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";

const router = express.Router()

/**
 * @routes POST /api/cart/add/:productId/:variantId
 * @description Add item to cart
 * @access Private
 * @argument productId - ID of the product to add
 * @argument variantId - ID of the variant to add
 * @argument quantity - Quantity of the item to add(optional, default: 1)
 */

router.post("/",authenticateUser,validateAddToCart, addToCart)

router.get("/cart",authenticateUser,getCart)
export default router;