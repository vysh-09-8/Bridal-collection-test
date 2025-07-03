// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Button } from "react-bootstrap";
// // const BridalWear = () => {
// //   const [bridalWearData, setBridalWearData] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Fetch bridal wear data from backend
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:9000/admin/view-bridal-wear");
// //         setBridalWearData(response.data);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error("Error fetching bridal wear data:", err);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   if (loading) {
// //     return <div className="text-center">Loading...</div>;
// //   }

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="text-center mb-4">Bridal Wear Details</h2>
// //       {bridalWearData.length === 0 ? (
// //         <p className="text-center">No bridal wear data available.</p>
// //       ) : (
// //         <table className="table table-striped table-bordered">
// //           <thead className="table-dark">
// //             <tr>
// //               <th>#</th>
// //               <th>Religion</th>
// //               <th>Occasion</th>
// //               <th>Gender</th>
// //               <th>Description</th>
// //               <th>Images</th>
// //               <th>Delete</th>
// //               <th>Edit</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {bridalWearData.map((item, index) => (
// //               <tr key={item._id}>
// //                 <td>{index + 1}</td>
// //                 <td>{item.religion}</td>
// //                 <td>{item.occassion}</td>
// //                 <td>{item.gender}</td>
// //                 <td>
// //                   <ul>
// //                     {item.description.map((desc, idx) => (
// //                       <li key={idx}>
// //                         <strong>Print:</strong> {desc.print} | <strong>Color:</strong> {desc.color} |{" "}
// //                         <strong>Product:</strong> {desc.product} | <strong>Fabric:</strong> {desc.fabric} |{" "}
// //                         <strong>Features:</strong> {desc.features} | <strong>Fit:</strong> {desc.fit} |{" "}
// //                         <strong>Styling:</strong> {desc.styling} | <strong>Country of Origin:</strong>{" "}
// //                         {desc.countryorigin} | <strong>Manufacturer:</strong> {desc.manufacturer}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </td>
// //                 <td>
// //                   {item.images.map((image, idx) => (
// //                     <img
// //                       key={idx}
// //                       src={`http://localhost:9000/${image}`}
// //                       alt="Bridal Wear"
// //                       style={{ width: "100px", margin: "5px" }}
// //                     />
// //                   ))}
// //                 </td>
// //                 <td><Button>Delete</Button></td>
// //                 <td><Button>EDIT</Button></td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default BridalWear;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Table } from "antd"; // Using Ant Design for table functionality
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Importing icons
// import { useNavigate } from "react-router-dom";
// import Navbar from "./navbar";
// const BridalWear = () => {
//   const [bridalWearData, setBridalWearData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate=useNavigate()

//   useEffect(() => {
//     // Fetch bridal wear data from backend
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/admin/view-bridal-wear");
//         setBridalWearData(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching bridal wear data:", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   // Function to render description
//   const renderDescription = (description) => {
//     return (
//       <ul>
//         {description.map((desc, idx) => (
//           <li key={idx}>
//             <strong>Print:</strong> {desc.print} | <strong>Color:</strong> {desc.color} |{" "}
//             <strong>Product:</strong> {desc.product} | <strong>Fabric:</strong> {desc.fabric} |{" "}
//             <strong>Features:</strong> {desc.features} | <strong>Fit:</strong> {desc.fit} |{" "}
//             <strong>Styling:</strong> {desc.styling} | <strong>Country of Origin:</strong>{" "}
//             {desc.countryorigin} | <strong>Manufacturer:</strong> {desc.manufacturer}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   // Function to render images
//   const renderImages = (images) => {
//     return (
//       <div>
//         {images.length > 0 ? (
//           images.map((image, idx) => (
//             <img
//               key={idx}
//               src={`http://localhost:9000/${image}`}
//               alt={`Bridal Wear ${idx}`}
//               style={{ width: "100px", margin: "5px" }}
//             />
//           ))
//         ) : (
//           <p>No images available.</p>
//         )}
//       </div>
//     );
//   };

//   const handleDelete = (key) => {
//     console.log(`Deleting item with key: ${key}`);
//     axios.delete('http://localhost:9000/admin/delete-bridal-wear',{headers:{_id:key}})
//     .then((res)=>{alert(res.data)
//         window.location.reload()
//     })
//     .catch((err)=>console.log(err))

    
//   };

//   const handleEdit = (key) => {
//     console.log(`Editing item with key: ${key}`);
//     navigate(`/admin/editbridal/${key}`)
    
//   };

//   // Handle redirect to Add Bridal form
//   const handleAddBridal = () => {
//    navigate("/admin/addbridal");
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Bridal Wear Details</h2>
//       {bridalWearData.length === 0 ? (
//         <p className="text-center">No bridal wear data available.</p>
//       ) : (
//         <Table
//           dataSource={bridalWearData}
//           rowKey="_id" // Use a unique identifier for each row
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
//               title: "Religion",
//               dataIndex: "religion",
//             },
//             {
//               title: "Occasion",
//               dataIndex: "occassion",
//             },
//             {
//               title: "Gender",
//               dataIndex: "gender",
//             },
//             {
//               title: "Description",
//               dataIndex: "description",
//               render: renderDescription,
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
//         onClick={handleAddBridal}
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

// export default BridalWear;


import React,{ useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Collapse, Box, Fab } from "@mui/material";
import { Delete, Edit, Add, ExpandLess, ExpandMore } from "@mui/icons-material"; // Material-UI icons
import { useNavigate } from "react-router-dom";


const BridalWear = () => {
  const [bridalWearData, setBridalWearData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null); // Track which row is expanded
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bridal wear data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/admin/view-bridal-wear");
        setBridalWearData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bridal wear data:", err);
        setLoading(false);
      }
    };
    fetchData();
    const handlePopState = () => {
      window.history.pushState(null, null, window.location.href);
    };

    window.history.pushState(null, null, window.location.href); // Push a new state into history
    window.addEventListener("popstate", handlePopState); // Listen to popstate to prevent going back

    // Cleanup the event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };

   
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Function to render images
  const renderImages = (images) => (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {images.length > 0 ? (
        images.map((image, idx) => (
          <img
            key={idx}
            src={`http://localhost:9000/${image}`}
            alt={`Bridal Wear ${idx}`}
            style={{ width: "100px", borderRadius: "5px" }}
          />
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">No images available.</Typography>
      )}
    </Box>
  );

  const handleDelete = (id) => {
    axios.delete("http://localhost:9000/admin/delete-bridal-wear", { headers: { _id: id } })
      .then((res) => {
        alert(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    navigate(`/admin/editbridal/${id}`);
  };

  const handleAddBridal = () => {
    navigate("/admin/addbridal");
  };

  return (
    <>
      <div className="container mt-5">
        <Typography variant="h4" align="center" gutterBottom>
          Bridal Wear Details
        </Typography>

        {bridalWearData.length === 0 ? (
          <Typography align="center" variant="h6" color="textSecondary">
            No bridal wear data available.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Religion</TableCell>
                  <TableCell>Occasion</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bridalWearData.map((item, index) => (
                  <React.Fragment key={item._id}>
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.religion}</TableCell>
                      <TableCell>{item.occassion}</TableCell>
                      <TableCell>{item.gender}</TableCell>
                      <TableCell>
                        <IconButton color="error" onClick={() => handleDelete(item._id)}>
                          <Delete />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEdit(item._id)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => setExpandedRow(expandedRow === item._id ? null : item._id)}>
                          {expandedRow === item._id ? <ExpandLess/> : <ExpandMore/>}
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    {/* Expandable Row */}
                    <TableRow>
                      <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={expandedRow === item._id} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                            <Typography variant="h6">Description</Typography>
                            <ul>
                              {item.description.map((desc, idx) => (
                                <li key={idx}>
                                  <strong>Print:</strong> {desc.print} | <strong>Color:</strong> {desc.color} |{" "}
                                  <strong>Product:</strong> {desc.product} | <strong>Fabric:</strong> {desc.fabric} |{" "}
                                  <strong>Features:</strong> {desc.features} | <strong>Fit:</strong> {desc.fit} |{" "}
                                  <strong>Styling:</strong> {desc.styling} | <strong>Country of Origin:</strong>{" "}
                                  {desc.countryorigin} | <strong>Manufacturer:</strong> {desc.manufacturer}
                                </li>
                              ))}
                            </ul>
                            <Typography variant="h6" sx={{ mt: 2 }}>Images</Typography>
                            {renderImages(item.images)}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Floating Add Button */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleAddBridal}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
          }}
        >
          <Add />
        </Fab>
      </div>
    </>
  );
};

export default BridalWear;

