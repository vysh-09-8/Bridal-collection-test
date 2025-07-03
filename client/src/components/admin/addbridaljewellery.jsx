import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const AddJewellery= () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    gender: "",
    color: "",
    pieces: "",
    weight: "",
    fit: "",
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate=useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    for (let i = 0; i < images.length; i++) {
      form.append("images", images[i]);
    }

    try {
      const response = await axios.post("http://localhost:9000/admin/add-bridal-jewellery", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
      setFormData({
        name: "",
        price: "",
        gender: "",
        color: "",
        pieces: "",
        weight: "",
        fit: "",
      });
      setImages([]);
      navigate("/admin/viewjewellery")
    } catch (error) {
      console.error("Error adding jewellery:", error);
      setMessage("Failed to add jewellery. Please try again.");
    }
  };

  return (<>
  
    <Navbar/>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Jewellery</h2>
      {message && <p className="text-center">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            className="form-select"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Color</label>
          <input
            type="text"
            className="form-control"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pieces" className="form-label">Pieces</label>
          <input
            type="text"
            className="form-control"
            id="pieces"
            name="pieces"
            value={formData.pieces}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">Weight</label>
          <input
            type="text"
            className="form-control"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fit" className="form-label">Fit</label>
          <input
            type="text"
            className="form-control"
            id="fit"
            name="fit"
            value={formData.fit}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="images" className="form-label">Upload Images</label>
          <input
            type="file"
            className="form-control"
            id="images"
            name="images"
            accept="image/*"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Jewellery</button>
      </form>
    </div>
    </>
  );
};

export default AddJewellery;
