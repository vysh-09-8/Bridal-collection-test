const express=require('express')
const { userRegister,viewBridalWear, userLogin, viewbridalproduct, viewJewellery, viewJewellerySingle, addCart, viewcart, removeCartItem, sentMessage, buyerAuctionsAmount, fetchAuction, updateCartQuantity, buyProduct, getOrders, viewFavourite, removeFavourite, addFavourite } = require('../controls/userctrl')
const userRouter=express.Router()




userRouter.route("/view-bridal-wear").get(viewBridalWear)
userRouter.route("/register-user").post(userRegister)
userRouter.route("/login-user").post(userLogin)
userRouter.route("/view-products/:id").get(viewbridalproduct)
userRouter.route("/view-jewellery-user").get(viewJewellery)
userRouter.route("/view-jewellery/:id").get(viewJewellerySingle)
userRouter.route("/addcart").post(addCart)
userRouter.route("/viewcart").get(viewcart)
userRouter.route("/remove-from-cart").delete(removeCartItem)
userRouter.route("/addContact").post(sentMessage)
userRouter.route("/add-auction").post(buyerAuctionsAmount)
userRouter.route("/view-auction").get(fetchAuction)
userRouter.route("/update-cart-quantity").put(updateCartQuantity)
userRouter.route("/buy-product").post(buyProduct)
userRouter.route("/my-orders").get(getOrders)
userRouter.route("/viewfavourite").get(viewFavourite)
userRouter.route("/removefavourite").post(removeFavourite)
userRouter.route("/addfavourite").post(addFavourite)

module.exports=userRouter