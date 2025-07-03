// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Table } from "antd";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./navbar";

// const ViewBridalJewellery = () => {
//   const [jewelleryData, setJewelleryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch bridal jewellery data from backend
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/admin/view-bridal-jewellery");
//         setJewelleryData(response.data.jewellery);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching bridal jewellery data:", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   // Render images
//   const renderImages = (images) => (
//     <div>
//       {images.length > 0 ? (
//         images.map((image, idx) => (
//           <img
//             key={idx}
//             src={`http://localhost:9000/${image}`}
//             alt={`Jewellery ${idx}`}
//             style={{ width: "100px", margin: "5px" }}
//           />
//         ))
//       ) : (
//         <p>No images available.</p>
//       )}
//     </div>
//   );

//   const handleDelete = (key) => {
//     console.log(`Deleting jewellery with key: ${key}`);
//     axios
//       .delete("http://localhost:9000/admin/delete-bridal-jewellery", {
//         headers: { _id: key },
//       })
//       .then((res) => {
//         alert(res.data);
//         window.location.reload();
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleEdit = (key) => {
//     console.log(`Editing jewellery with key: ${key}`);
//     navigate(`/admin/editjewellery/${key}`);
//   };

//   // Redirect to Add Bridal Jewellery form
//   const handleAddJewellery = () => {
//     navigate("/admin/addjewellery");
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Bridal Jewellery Details</h2>
//       {jewelleryData.length === 0 ? (
//         <p className="text-center">No bridal jewellery data available.</p>
//       ) : (
//         <Table
//           dataSource={jewelleryData}
//           rowKey="_id"
//           expandable={{
//             expandedRowRender: (record) => (
//               <div>
//                 <h5>Images</h5>
//                 {renderImages(record.images)}
//               </div>
//             ),
//             rowExpandable: (record) => record.images.length > 0,
//           }}
//           columns={[
//             {
//               title: "#",
//               dataIndex: "key",
//               render: (_, __, index) => index + 1,
//             },
//             {
//               title: "Name",
//               dataIndex: "name",
//             },
//             {
//               title: "Price",
//               dataIndex: "price",
//             },
//             {
//               title: "Gender",
//               dataIndex: "gender",
//             },
//             {
//               title: "Color",
//               dataIndex: "color",
//             },
//             {
//               title: "Pieces",
//               dataIndex: "pieces",
//             },
//             {
//               title: "Weight",
//               dataIndex: "weight",
//             },
//             {
//               title: "Fit",
//               dataIndex: "fit",
//             },
//             {
//               title: "Action",
//               render: (_, record) => (
//                 <span>
//                   <DeleteOutlined
//                     style={{ color: "red", marginRight: 10, cursor: "pointer" }}
//                     onClick={() => handleDelete(record._id)}
//                   />
//                   <EditOutlined
//                     style={{ color: "blue", cursor: "pointer" }}
//                     onClick={() => handleEdit(record._id)}
//                   />
//                 </span>
//               ),
//             },
//           ]}
//         />
//       )}

//       {/* Floating Button */}
//       <button
//         className="floating-btn"
//         onClick={handleAddJewellery}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           backgroundColor: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "50%",
//           width: "60px",
//           height: "60px",
//           fontSize: "30px",
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         +
//       </button>
//     </div>
//     </>
//   );
// };

// export default ViewBridalJewellery;
import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { DeleteOutlined, EditOutlined, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const ViewBridalJewellery = () => {
  const [jewelleryData, setJewelleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null); // State to track expanded row
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bridal jewellery data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/admin/view-bridal-jewellery");
        setJewelleryData(response.data.jewellery);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bridal jewellery data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Render images
  const renderImages = (images) => (
    <div>
      {images.length > 0 ? (
        images.map((image, idx) => (
          <img
            key={idx}
            src={`http://localhost:9000/${image}`}
            alt={`Jewellery ${idx}`}
            style={{ width: "100px", margin: "5px" }}
          />
        ))
      ) : (
        <p>No images available.</p>
      )}
    </div>
  );

  const handleDelete = (key) => {
    console.log(`Deleting jewellery with key: ${key}`);
    axios
      .delete("http://localhost:9000/admin/delete-bridal-jewellery", {
        headers: { _id: key },
      })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (key) => {
    console.log(`Editing jewellery with key: ${key}`);
    navigate(`/admin/editjewellery/${key}`);
  };

  // Redirect to Add Bridal Jewellery form
  const handleAddJewellery = () => {
    navigate("/admin/addjewellery");
  };

  // Toggle images display for expanded row
  const handleToggleImages = (key) => {
    setExpandedRow(expandedRow === key ? null : key);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Bridal Jewellery Details</h2>
        {jewelleryData.length === 0 ? (
          <p className="text-center">No bridal jewellery data available.</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Pieces</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Fit</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jewelleryData.map((record, index) => (
                  <TableRow key={record._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.price}</TableCell>
                    <TableCell>{record.gender}</TableCell>
                    <TableCell>{record.color}</TableCell>
                    <TableCell>{record.pieces}</TableCell>
                    <TableCell>{record.weight}</TableCell>
                    <TableCell>{record.fit}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(record._id)}
                      >
                        <DeleteOutlined />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(record._id)}
                      >
                        <EditOutlined />
                      </IconButton>
                      <IconButton
                        color="default"
                        onClick={() => handleToggleImages(record._id)}
                      >
                        {expandedRow === record._id ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Render images for expanded row */}
        {expandedRow && (
          <div className="mt-3">
            {renderImages(jewelleryData.find(item => item._id === expandedRow)?.images || [])}
          </div>
        )}

        {/* Floating Button */}
        <button
          className="floating-btn"
          onClick={handleAddJewellery}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "30px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          +
        </button>
      </div>
    </>
  );
};

export default ViewBridalJewellery;
