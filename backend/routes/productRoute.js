import { addToWishlist } from "../controllers/wishList";
import express from 'express'

const router = express.Router()


router.post('create_wishlist',addToWishlist)


export default router