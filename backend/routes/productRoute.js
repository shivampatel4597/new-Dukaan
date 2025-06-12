import { addToWishlist } from "../controllers/wishList.js";
import express from 'express'

const router = express.Router()


router.post('create_wishlist',addToWishlist)


export default router