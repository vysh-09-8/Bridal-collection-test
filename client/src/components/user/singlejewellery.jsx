import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import "./viewproducts.css";

export default function SingleJewellery() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/user/view-jewellery/${id}`)
      .then((res) => {
        const fetchedProduct = res.data.jewellery[0];
        console.log(fetchedProduct)
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]); // Default to the first image
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <Navbar />
      <div className="main">
        {/* Left Section */}
        <div className="sub-main1">
          {/* Thumbnail Images */}
          <div className="img-arr">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:9000/${image}`}
                alt={`Product Image ${index + 1}`}
                className="thumbnail"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="img-card">
            <img
              src={`http://localhost:9000/${selectedImage}`}
              alt="Main Product"
              className="main-img"
            />
          </div>

          {/* Product Details */}
          <div className="details">
            <h1>{product.name}</h1>
            <h2>Price: Rs. {product.price}</h2>
            <h3>Gender: {product.gender}</h3>
            <h3>Color: {product.color}</h3>
            <h3>Pieces: {product.pieces}</h3>
            <h3>Weight: {product.weight}</h3>
            <h3>Fit: {product.fit}</h3>
            <div className="actions">
              <button className="btn add-to-cart">Add to Cart</button>
              <button className="btn add-to-fav">Favourite</button>
            </div>
            <button className="btn buy-now">Buy Now</button>
          </div>
        </div>

        {/* Right Section */}
        {/* <div className="sub-main2">
          <h2>Description</h2>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Gender:</strong> {product.gender}
          </p>
          <p>
            <strong>Color:</strong> {product.color}
          </p>
          <p>
            <strong>Pieces:</strong> {product.pieces}
          </p>
          <p>
            <strong>Weight:</strong> {product.weight}
          </p>
          <p>
            <strong>Fit:</strong> {product.fit}
          </p>
        </div> */}
      </div>
    </>
  );
}
