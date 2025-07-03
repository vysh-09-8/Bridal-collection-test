// Importing the Bridal Model
const auctionModel = require('../models/auctionModel');
const BridalModel = require('../models/bridalModel');
const JewelleryModel =require('../models/jewelleryModel');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');

// First crud for bridalwear from line 6 to 64

const addBridalWear = async (req, res) => {
    try {
        const { religion, occassion, gender, description,price,auctionAmount } = req.body;

        // Parse description (if received as a string)
        const parsedDescription = JSON.parse(description);

        const newBridalWear = new BridalModel({
            religion,
            occassion,
            gender,
            images: req.files ? req.files.map((file) => file.path) : [],
            description: parsedDescription,
            price,
            auctionAmount 
        });

        await newBridalWear.save();
        res.status(201).json({ message: 'Bridal wear added successfully!' });
    } catch (error) {
        console.error('Error adding bridal wear:', error);
        res.status(500).json({ message: 'Failed to add bridal wear.', error });
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

  const viewBridalWearID=async(req, res) => {
    try {
      const { id } = req.params;
      const data = await BridalModel.find({_id:id});
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch bridal wear data." });
    }
  };


  const deleteBridalWear=async(req,res)=>{
    try{
        const id=req.headers._id
       await BridalModel.deleteOne({_id:id})
        res.json("Item deleted successfully")
    }
    catch(err){console.log(err)
        res.json("error occured while")
    }

  }

  const deleteUser=async(req,res)=>{
    try{
        const id=req.headers.id
       await userModel.deleteOne({_id:id})
        res.json("User deleted successfully")
    }
    catch(err){console.log(err)
        res.json("error occured while")
    }

  }


  const editBridalWear=async(req,res)=>{
        const { id } = req.params;
        const updatedData = req.body; 
        console.log(req.body)
        try {
          await BridalModel.findByIdAndUpdate({_id:id}, updatedData, { new: true });
          res.json("Updated");
        } catch (err) {
          res.status(500).json({ message: 'Error updating bridal wear' });
        }
  }



//   Second crud for jewellery from line 70 to 

const addJewellery = async (req, res) => {
    try {
      // Extract the data from the request body
      const { name,price, gender, color, pieces, weight, fit} = req.body; 
      // Validate required fields
      if (!name || !price || !gender || !color || !pieces || !weight || !fit) {
        return res.status(400).json({ message: 'All required fields must be filled.' });
      }
      // Create a new jewellery document
      const newJewellery = new JewelleryModel({
        name,
        images: req.files ? req.files.map((file) => file.path) : [],
        price,
        gender,
        color,
        pieces,
        weight,
        fit,
        auctionAmount
      });
  
      // Save the document to the database
      const savedJewellery = await newJewellery.save();
  
      // Respond with the saved jewellery item
      return res.status(201).json({
        message: 'Jewellery added successfully.',
        jewellery: savedJewellery,
      });
    } catch (error) {
      console.error('Error adding jewellery:', error);
      return res.status(500).json({ message: 'Internal server error.' });
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
  
 
  
const viewUsers = async (req, res) => { 
    try {
        const data = await userModel.find({role:{ $ne: "admin" }});
        console.log(data)
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch user data." });
    }
};


const viewCount = async (req, res) => {
  try {
    const userCount = await userModel.countDocuments({ role: { $ne: "admin" } });
    const productCount = await BridalModel.countDocuments();

    return res.status(200).json({
      success: true,
      userCount,
      productCount,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


const fecthAuctions=async(req,res)=>{
  try{
    const auction=await auctionModel.find().populate("userId")
    .populate("productId")
    console.log(auction)
    res.json(auction)
  }catch(err){
    console.log(err)
  }
}

const auctionResponse = async (req, res) => {
  try {
    const { auctionId, actionType, email,amount } = req.body;

    // Find the auction based on auctionId
    const auction = await auctionModel.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Update the auction status with actionType (accept or reject)
    auction.status = actionType;
    await auction.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // You can use any service, like Gmail, SendGrid, etc.
      auth: {
        user: 'vyshnavics652@gmail.com',  // Your email address
        pass: 'pahw sblb sdvj jyzg',  // Your email password (use environment variables for sensitive info)
      },
    });

    // Set email options
    const mailOptions = {
      from: 'vyshnavics652@gmail.com',  // Sender email address
      to: email,  // Receiver email address
      subject: 'Bridal Collections-Auction Confirmation Mail!',  // Subject of the email
     
      html: `
    <p>Your auction with ID <strong>${auctionId}</strong> has been <strong>${actionType}ed</strong>.</p>
    <p>The amount of Rs.${amount}/- has to be sent to the below-given bank details:</p>
    <table>
      <tr>
        <td><strong>Account Holder Name:</strong></td>
        <td>John Doe</td>
      </tr>
      <tr>
        <td><strong>Account Number:</strong></td>
        <td>123456789012</td>
      </tr>
      <tr>
        <td><strong>Bank Name:</strong></td>
        <td>XYZ Bank</td>
      </tr>
      <tr>
        <td><strong>IFSC Code:</strong></td>
        <td>XYZB0001234</td>
      </tr>
      <tr>
        <td><strong>Branch:</strong></td>
        <td>Downtown Branch</td>
      </tr>
    </table>
    <p>If you have any questions, feel free to contact us.</p>
  `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email', error });
      }
      console.log('Email sent: ' + info.response);
    });

    // Send response back to the client
    return res.status(200).json({ message: `Auction ${actionType} and email sent to ${email}` });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
      const { orderId, status } = req.body;

      await orderModel.findByIdAndUpdate(orderId, { shippingStatus: status });
      res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrders = async (req, res) => {
  try {
      const userId = req.headers.userid;
      const orders = await orderModel.find().populate("cartId")
      res.status(200).json(orders);
  } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {viewBridalWearID,addBridalWear,viewBridalWear,deleteBridalWear,editBridalWear,addJewellery,viewJewellery ,viewUsers, viewCount, deleteUser, fecthAuctions, auctionResponse, updateOrderStatus,getOrders};



