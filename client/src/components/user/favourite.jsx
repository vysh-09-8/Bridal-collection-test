import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './favourites.css'
import { Button } from '@mui/material';

export default function Favourite() {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    const id = sessionStorage.getItem("userid");
    
    axios.get("http://localhost:9000/user/viewfavourite", { headers: { id: id } })
      .then((res) => {
        console.log(res.data);
        setFavorites(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const removeFavorite = (productId) => {
    const userId = sessionStorage.getItem("userid");

    axios
      .post("http://localhost:9000/user/removefavourite",{ userId, productId })
      .then((res) => {
        if (res.data) {
          setFavorites(favorites.filter(product => product._id !== productId));
          alert(res.data.message);
          window.location.reload()
        } else {
          alert("Failed to remove from favorites.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="favorites-container">
        <h2>Your Favorite Products</h2>
        <Button href="/userhome">Back to Home</Button>
            
        <div className="favorites-grid">
          {favorites.length === 0 ? (
            <p>No favorite products found.</p>
          ) : (
            favorites.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src={`http://localhost:9000/${product.productId.images[0]}`} // Assuming the product has an images array
                  alt={product.productId.description[0].product} // Displaying the product name as alt text
                  className="product-image"
                />
                <div className="product-details">
                  <h3>{product.productId.description[0].product}</h3>
                  <p>Price: Rs. {product.productId.price}</p>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFavorite(product.productId._id)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
