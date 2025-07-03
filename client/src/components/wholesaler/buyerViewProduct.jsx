import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./viewproducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faGavel } from "@fortawesome/free-solid-svg-icons";

export default function BuyerViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [highestBid, setHighestBid] = useState(0);
  const [auctionEndTime, setAuctionEndTime] = useState(null);
  const [userBid, setUserBid] = useState("");
  const [auction, setAuction] = useState([]);
  const [userHasBid, setUserHasBid] = useState(false); // Track if user has already placed a bid
  const [auctionConfirmed, setAuctionConfirmed] = useState(false); // Track if auction is confirmed
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "1234567890",
    ifscCode: "ABC123",
    bankName: "Sample Bank",
  });
  const userid = sessionStorage.getItem("userid");

  useEffect(() => {
    // Fetch product details
    axios
      .get(`http://localhost:9000/user/view-products/${id}`)
      .then((res) => {
        const fetchedProduct = res.data[0];
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]);
        setLoading(false);
        setTotalPrice(fetchedProduct.auctionAmount);
        setHighestBid(fetchedProduct.startingBid || fetchedProduct.auctionAmount);
        setAuctionEndTime(Date.now() + fetchedProduct.auctionDuration * 60 * 1000); // Convert minutes to milliseconds
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // Fetch auction details and check if the user has placed a bid
    axios
      .get(`http://localhost:9000/user/view-auction`, { headers: { id: id } })
      .then((res) => {
        setAuction(res.data);
        const userBid = res.data.find((bid) => bid.userId === userid);
        if (userBid) {
          setUserHasBid(true);
          setAuctionConfirmed(userBid.isConfirmed); // Assuming `isConfirmed` indicates auction confirmation
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, userid]);

  // Function to handle placing a bid
  const placeBid = () => {
    const bidAmount = parseFloat(userBid);
    if (isNaN(bidAmount) || bidAmount <= highestBid) {
      console.log("Bid must be higher than the current highest bid.");
      return;
    }
    console.log(id, bidAmount, userid);
    axios
      .post(
        "http://localhost:9000/user/add-auction",
        {
          productId: id,
          auctionAmount: bidAmount,
        },
        {
          headers: { userid: userid },
        }
      )
      .then((res) => {
        alert(res.data);
        setHighestBid(bidAmount);
        setUserBid("");
      })
      .catch((err) => {
        console.error("Error placing bid", err);
      });
    window.location.reload();
  };

  // Function to send email after auction is confirmed
  const sendAuctionConfirmationEmail = () => {
    axios
      .post("http://localhost:9000/user/send-confirmation-email", {
        productId: id,
        userId: userid,
        bankDetails: bankDetails,
      })
      .then((res) => {
        console.log("Email sent successfully:", res.data);
      })
      .catch((err) => {
        console.error("Error sending email:", err);
      });
  };

  // Check if auction has ended
  const auctionEnded = Date.now() >= auctionEndTime;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className="main">
      {/* Left Section */}
      <div className="sub-main1">
        <div className="img-arr">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:9000/${image}`}
              alt={`Product ${index + 1}`}
              className="thumbnail"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>

        <div className="img-card">
          <img
            src={`http://localhost:9000/${selectedImage}`}
            alt="Main Product"
            className="main-img"
          />
        </div>

        <div className="details">
          <h1>{product.description[0].product}</h1>
          <h2>Price: Rs. {product.price}</h2>
          <h3>Occasion: {product.occassion}</h3>

          {/* Auction Module */}
          {!userHasBid && (
            <div className="auction-section">
              <h2>
                <FontAwesomeIcon icon={faGavel} /> Auction
              </h2>
              <h3>Starting Bid: Rs. {highestBid}</h3>
              <h3>Highest Bid: Rs. {auction[0]?.auctionAmount}</h3>

              {auctionEnded ? (
                <h3 style={{ color: "red" }}>Auction Ended</h3>
              ) : (
                <>
                  <input
                    type="number"
                    value={userBid}
                    placeholder="Enter your bid"
                    onChange={(e) => setUserBid(e.target.value)}
                  />
                  <button onClick={placeBid} className="btn place-bid">
                    Place Bid
                  </button>
                  {/* <p>Auction Ends At: {new Date(auctionEndTime).toLocaleTimeString()}</p> */}
                </>
              )}
            </div>
          )}

          {userHasBid &&  (
            <div className="auction-confirmation-message">
              <h3>IF Your bid has been confirmed!</h3>
              <p>You will receive an email with the details of the bank account where you can deposit the money.</p>
              {/* <p><strong>Bank Account Details:</strong></p>
              <p>Account Number: {bankDetails.accountNumber}</p>
              <p>IFSC Code: {bankDetails.ifscCode}</p>
              <p>Bank Name: {bankDetails.bankName}</p> */}
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="sub-main2">
        <h2>Description</h2>
        <p>
          <strong>Features:</strong> {product.description[0].features || "No description available."}
        </p>
        <p>
          <strong>Fabric:</strong> {product.description[0].fabric || "No fabric details available."}
        </p>
      </div>
    </div>
  );
}
