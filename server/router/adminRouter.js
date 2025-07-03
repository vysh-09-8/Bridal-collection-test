const express=require('express')
const adminRouter=express.Router()
const multer=require('multer')
const path=require('path')
const { addBridalWear,viewBridalWear, deleteBridalWear, editBridalWear, addJewellery, viewJewellery, viewUsers, viewCount, viewBridalWearID, deleteUser, fecthAuctions, auctionResponse, getOrders, updateOrderStatus } = require('../controls/adminCtrl')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploads=multer({storage:storage})



adminRouter.route("/add-bridal-wear").post(uploads.array("images",5),addBridalWear)
adminRouter.route("/view-bridal-wear").get(viewBridalWear)
adminRouter.route("/delete-bridal-wear").delete(deleteBridalWear)
adminRouter.route("/update-bridal-wear/:id").put(editBridalWear)
adminRouter.route("/add-bridal-jewellery").post(uploads.array("images",5),addJewellery)
adminRouter.route("/view-bridal-jewellery").get(viewJewellery)
adminRouter.route("/view-user").get(viewUsers)
adminRouter.route("/viewcount").get(viewCount)
adminRouter.route("/edit-bridal-wear/:id").get(viewBridalWearID)
adminRouter.route("/deleteUser").delete(deleteUser)
adminRouter.route("/viewAuction").get(fecthAuctions)
adminRouter.route("/response").post(auctionResponse)
adminRouter.route("/orders").get(getOrders)
adminRouter.route("/update-order-status").put(updateOrderStatus)

module.exports=adminRouter