import express from 'express'
import { addDoctor,loginAdmin } from '../controllers/adminController.js'
import authAdmin from '../middleware/authAdmin.js'

import upload from '../middleware/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)

export default adminRouter