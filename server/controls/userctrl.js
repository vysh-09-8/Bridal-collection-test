const BridalModel = require('../models/bridalModel');
const JewelleryModel =require('../models/jewelleryModel')
const userModel=require('../models/userModel')
const cartModel=require('../models/cartModel')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const contactModel=require('../models/contactModel')
const auctionModel=require('../models/auctionModel')
const Order = require('../models/orderModel');
const favourite=require('../models/favourites');

const userRegister = async (req, res) => {
  const { email, firstName, lastName, phone, password,userType } = req.body;
  console.log(req.body)
  try {
    // Check if the user already exists
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).json("User already exists");
    }

    // Hash the password
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const regform = new userModel({
      firstName,
      lastName,
      email,
      password: hashpassword,
      phone,
      role:userType,
    });

    // Save the user to the database
    await regform.save();

    // Send success response
    res.status(200).json("Registration Successful");
  } catch (err) {
    console.error(err);
    res.status(500).json("An error occurred during registration");
  }
};


const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  try {
    // Check if the user exists
    const user = await userModel.findOne({ email: email });
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    console.log("success")
    // Successful login
    res.status(200).json({
      message: "Login successful",
      user:user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred during login" });
  }
};
const viewBridalWear=async(req, res) => {
    try {
      const data = await BridalModel.find();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch bridal wear data." });
    }
  };

  const viewbridalproduct=async(req, res) => {
    try {
      const id=req.params.id
      const data = await BridalModel.find({_id:id});
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch bridal wear data." });
    }
  };

  const viewJewellery = async (req, res) => {
    try {
      // Fetch all jewellery documents from the database
      const jewellery = await JewelleryModel.find();
  
      // Check if any jewellery data exists
      if (!jewellery || jewellery.length === 0) {
        return res.status(404).json({ message: "No jewellery items found." });
      }
  
      // Respond with the jewellery data
      return res.status(200).json({
        message: "Jewellery items retrieved successfully.",
        jewellery,
      });
    } catch (error) {
      console.error("Error fetching jewellery data:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  const viewJewellerySingle = async (req, res) => {
    try {
      // Fetch all jewellery documents from the database
      const id=req.params.id
      const jewellery = await JewelleryModel.find({_id:id});
  
      // Check if any jewellery data exists
      if (!jewellery || jewellery.length === 0) {
        return res.status(404).json({ message: "No jewellery items found." });
      }
  
      // Respond with the jewellery data
      return res.status(200).json({
        message: "Jewellery items retrieved successfully.",
        jewellery,
      });
    } catch (error) {
      console.error("Error fetching jewellery data:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  const addCart = async (req, res) => {
    const { userId, productId, quantity, size } = req.body;
    console.log(userId, productId, quantity, "size:", size);

    try {
        let cart = await cartModel.findOne({ userId: userId });

        // If cart exists and has already been ordered, create a new cart
        if (cart && cart.status === "Ordered") {
            cart = new cartModel({
                userId,
                items: [{ productId, quantity, size }]
            });
        } else if (cart) {
            // Check if the product with the same size exists in the cart
            const itemIndex = cart.items.findIndex(item => item.productId == productId && item.size == size);
            console.log("Item Index:", itemIndex);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity, size });
            }
        } else {
            // If no cart exists, create a new cart
            cart = new cartModel({
                userId,
                items: [{ productId, quantity, size }]
            });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
};

const viewcart=async(req, res) => {
  // console.log(req.headers)
  const userId = req.headers.userid;
  // console.log(userId)
  try {
  //   const cart = await cartModel.findOne({ userId })
  //   .populate("userId", "email") // Populate user details
  //   .populate("items.productId", "price images"); // Populate product details

  //   if (!cart) {
  //     return res.status(404).json({ message: "Cart not found" });
  //   }
  //   console.log(cart)
  //   res.status(200).json(cart);
  // } catch (err) {
  //   console.error("Error fetching cart:", err);
  //   res.status(500).json({ message: "Server error", error: err.message });
  // }

  const cart = await cartModel.aggregate([
    { 
      $match: { 
        userId: new mongoose.Types.ObjectId(userId),
        status: "cart" 
      } 
    },
    {
      $lookup: {
        from: "bridal_tbls", // Collection name for products
        localField: "items.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $lookup: {
        from: "user_tbls", // Collection name for users
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" } // Unwind user details if it's a single object
]);

res.json(cart);
console.log(cart)
} catch(error){
  console.error("Error fetching data with aggregation:", error);
  throw error;
}
}

const updateCartQuantity = async (req, res) => {
  const { cartId, productId, size, newQuantity, userId } = req.body;

  try {
    let cart = await cartModel.findOne({ _id: cartId, userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId && item.size === size);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = newQuantity;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const removeCartItem = async (req, res) => {
  const { userId, productId, size } = req.body; 

  console.log(userId, productId, "size:", size);

  try {
      // Find the cart associated with the user
      let cart = await cartModel.findOne({ userId: userId} && {status:"cart"});
      console.log("Cart",cart)
      if (cart) {
          // Find the item index by productId and size
          const itemIndex = cart.items.findIndex(
              (item) => item.productId == productId && item.size === size
          );
          console.log(itemIndex)
          if (itemIndex > -1) {
              // If the item exists in the cart, remove it
              cart.items.splice(itemIndex, 1);
              await cart.save();
              console.log("Item removed from cart");
              res.json("Item removed from cart").status(200);
          } else {
              res.json("Item not found in cart").status(404);
              console.log("Item not removed in cart");
          }
      } else {
          res.json("Cart not found").status(404);
      }
  } catch (err) {
      console.error("Error removing item from cart:", err);
      res.json("Error occurred").status(500);
  }
};

const sentMessage=(req,res)=>{
  try{
     const {Name,Message,Email}=req.body;
     const contact=contactModel({
      Name,
      Message,
      Email
     })
     res.json("Message Sent Successfully")
  }catch(err){
    console.log(err)
  }
}

const buyerAuctionsAmount = async (req, res) => {
  const userid = req.headers.userid; // Extract user ID from the request headers
  const { auctionAmount, productId } = req.body; // Extract auction amount and product ID from request body
  console.log(productId,auctionAmount,userid)
  // Check if auctionAmount and productId are provided
  if (!auctionAmount || !productId) {
    return res.status(400).json("Auction amount and product ID are required.");
  }

  try {
    const product = await auctionModel.findOne({ productId });

    if (product) {
      // If the current bid is less than the user's bid
      if (product.auctionAmount <= auctionAmount) {
        // Update the product's userId and auctionAmount
        product.userId = userid;
        product.auctionAmount = auctionAmount;
        
        // Save the updated product to the database
        await product.save();
        return res.json("Your Bid is Added");
      } else {
        return res.json("Your Bid is Less Than the current One");
      }
    } else {
      // If product doesn't exist, create a new auction entry
      const newAuction = new auctionModel({
        userId: userid,
        productId,
        auctionAmount,
      });
      
      // Save the new auction entry
      await newAuction.save();
      return res.json("Your Bid is Added");
    }
  } catch (error) {
    console.error("Error in auction logic:", error);
    return res.status(500).json("Something went wrong while processing your bid.");
  }
};

const fetchAuction=async(req,res)=>{
  try{
    const productId=req.headers.id
    const auction=await auctionModel.find({productId})
    res.json(auction)
  }catch(err){
    console.log(err)
  }
}

const buyProduct = async (req, res) => {
  try {
      const { userId, cartId,items, totalAmount, paymentStatus,  address } = req.body;
      console.log(req.body)
      // Validate required fields
      if (!userId || !cartId || !items || !totalAmount || !paymentStatus) {
          return res.status(400).json({ message: "All fields are required" });
      }

      // Check if cart exists
      const cart = await cartModel.findById({_id:cartId});
      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      // Set expected delivery date (Assuming 5 days from order date)
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() + 5);

      // Create new order
      const newOrder = new Order({
          userId,
          cartId,
          totalAmount,
          paymentStatus,
          expectedDate,
          deliveryAddress:address,
          shippingStatus: "Pending"
      });
     console.log(newOrder)
      await newOrder.save();

      // Clear user's cart after order is placed
      await cartModel.findByIdAndUpdate({_id:cartId},{status:"Ordered"});

      res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (error) {
      console.error("Error in buyProduct:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrders = async (req, res) => {
  try {
      const userId = req.headers.userid;
      const orders = await Order.find({ userId }).populate("cartId")
      res.status(200).json(orders);
  } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

const addFavourite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if the product is already in the user's favorites
    const products = await favourite.find({ userId, productId });

    // If the product is already in the favorites, return a message
    if (products.length > 0) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    // If the product is not in favorites, save it
    const product = new favourite({
      userId: userId,
      productId: productId
    });

    await product.save();  // Wait for the save operation to complete

    // Send success message
    res.status(200).json({ message: "Added to favorites" });
  } catch (err) {
    console.error(err);  // Log the error for debugging purposes
    res.status(500).json({ message: "An error occurred while adding to favorites" });
  }
};


const viewFavourite=async(req,res)=>{
  try{
    const userId=req.headers.id
    const product=await favourite.find({userId:userId}).populate("productId")
    res.json(product)
  }catch(err){
    console.log(err)
  }
}

const removeFavourite = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    console.log(req.body);
    await favourite.deleteOne({ userId, productId });

      res.json({ message: "Removed from favorites" })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while removing from favorites" });
  }
};


module.exports={fetchAuction,viewBridalWear,userRegister,userLogin,viewbridalproduct,viewJewellery,viewJewellerySingle,addCart,viewcart,removeCartItem,sentMessage,buyerAuctionsAmount,updateCartQuantity,buyProduct,getOrders,addFavourite,removeFavourite,viewFavourite}