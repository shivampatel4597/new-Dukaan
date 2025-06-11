import { login, signup } from "../controllers/Auth.js";
import express from 'express'

const router = express.Router()



router.post('/login', login)
router.post('/signup', signup)


export default router

