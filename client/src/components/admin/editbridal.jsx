import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Button, Spinner, Alert } from "react-bootstrap";

export default function EditBridal() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState({
    religion: "",
    occassion: "",
    gender: "",
    price: "",
    auctionAmount: "",
    description: {
      print: "",
      color: "",
      product: "",
      fabric: "",
      features: "",
      fit: "",
      styling: "",
      countryorigin: "",
      manufacturer: "",
    },
    images: [],
  });
  const [images, setImages] = useState([]); // Stores uploaded images
 const Navigate=useNavigate()
  // Fetch Product Data
  useEffect(() => {
    axios
      .get(`http://localhost:9000/user/view-products/${id}`)
      .then((res) => {
        if (res.data.length === 0) {
          setLoading(false);
          return;
        }

        const fetchedProduct = res.data[0];
        setProduct(fetchedProduct);
        setLoading(false);

        // Set initial form values
        setUpdated({
          religion: fetchedProduct?.religion || "",
          occassion: fetchedProduct?.occassion || "",
          gender: fetchedProduct?.gender || "",
          price: fetchedProduct?.price || "",
          auctionAmount: fetchedProduct?.auctionAmount || "",
          description: {
            product: fetchedProduct?.description?.[0]?.product || "",
            print: fetchedProduct?.description?.[0]?.print || "",
            color: fetchedProduct?.description?.[0]?.color || "",
            fabric: fetchedProduct?.description?.[0]?.fabric || "",
            features: fetchedProduct?.description?.[0]?.features || "",
            fit: fetchedProduct?.description?.[0]?.fit || "",
            styling: fetchedProduct?.description?.[0]?.styling || "",
            countryorigin: fetchedProduct?.description?.[0]?.countryorigin || "",
            manufacturer: fetchedProduct?.description?.[0]?.manufacturer || "",
          },
          images: fetchedProduct?.images || [],
        });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner animation="border" size="lg" />;
  if (!product) return <Alert variant="danger">Product not found</Alert>;

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("description")) {
      const nameParts = name.split(".");
      const field = nameParts[1];

      setUpdated({
        ...updated,
        description: {
          ...updated.description,
          [field]: value,
        },
      });
    } else {
      setUpdated({
        ...updated,
        [name]: value,
      });
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Store selected images in state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("updated",updated)
    e.preventDefault();

    const formData = new FormData();

    
    Object.keys(updated).forEach((key) => {
      if (key === "description") {
        Object.keys(updated.description).forEach((descKey) => {
          formData.append(`description[${descKey}]`, updated.description[descKey]);
        });
      } else {
        formData.append(key, updated[key]);
      }
    });

    images.forEach((file) => {
      formData.append("images", file);
    });

    console.log("Submitting FormData:", formData);

    try {
         await axios.put(`http://localhost:9000/admin/update-bridal-wear/${id}`, updated , {
        // headers: { "Content-Type": "multipart/form-data" },
      }).then((res)=>{
        alert(res.data)
      }).catch((err)=>{
        console.log(err)
      })
      Navigate("/admin/viewbridal")
    } catch (error) {
      console.error("Failed to update product", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Bridal Wear</h2>
      <Form onSubmit={handleSubmit}>
        {/* Product Name */}
        <Form.Group>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="description.product"
            value={updated.description.product}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Price */}
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={updated.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Auction Price</Form.Label>
          <Form.Control
            type="number"
            name="auctionAmount"
            value={updated.auctionAmount}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Occasion */}
        <Form.Group>
          <Form.Label>Occasion</Form.Label>
          <Form.Control
            type="text"
            name="occassion"
            value={updated.occassion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Features */}
        <Form.Group>
          <Form.Label>Features</Form.Label>
          <Form.Control
            as="textarea"
            name="description.features"
            value={updated.description.features}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Fabric */}
        <Form.Group>
          <Form.Label>Fabric</Form.Label>
          <Form.Control
            type="text"
            name="description.fabric"
            value={updated.description.fabric}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Product Type */}
        <Form.Group>
          <Form.Label>Product Type</Form.Label>
          <Form.Control
            type="text"
            name="description.product"
            value={updated.description.product}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Print */}
        <Form.Group>
          <Form.Label>Print</Form.Label>
          <Form.Control
            type="text"
            name="description.print"
            value={updated.description.print}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Color */}
        <Form.Group>
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            name="description.color"
            value={updated.description.color}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Fit */}
        <Form.Group>
          <Form.Label>Fit</Form.Label>
          <Form.Control
            type="text"
            name="description.fit"
            value={updated.description.fit}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Styling */}
        <Form.Group>
          <Form.Label>Styling</Form.Label>
          <Form.Control
            type="text"
            name="description.styling"
            value={updated.description.styling}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Country of Origin */}
        <Form.Group>
          <Form.Label>Country of Origin</Form.Label>
          <Form.Control
            type="text"
            name="description.countryorigin"
            value={updated.description.countryorigin}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Manufacturer */}
        <Form.Group>
          <Form.Label>Manufacturer</Form.Label>
          <Form.Control
            type="text"
            name="description.manufacturer"
            value={updated.description.manufacturer}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Image Upload */}
        {/* <Form.Group>
          <Form.Label>Upload Images</Form.Label>
          <Form.Control type="file" multiple onChange={handleImageChange} accept="image/*" />
        </Form.Group> */}

        {/* Submit Button */}
        <Button type="submit" className="mt-3" variant="primary" block>
          Save Changes
        </Button>
      </Form>
    </div>
  );
}
