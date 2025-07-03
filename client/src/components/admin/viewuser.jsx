// import React, { useState, useEffect } from "react";
// import { Button,Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Container,Typography } from "@mui/material";
// import AXIOS from "axios";
// import Navbar from "./navbar";

// export default function ViewUser() {
//   const [userDetails, setUserDetails] = useState(null);

//   useEffect(() => {
//      AXIOS.get('http://localhost:9000/admin/view-user')
//       .then((res) => {
//         setUserDetails(res.data); 
//         console.log(res.data)
//       })
//       .catch((err) => {
//         console.error("Error fetching user details:", err);
//       });
//   }, []);

//   // Handle user deletion
//   const handleDeleteUser = () => {
//     const userId = sessionStorage.getItem("userid");
//     AXIOS
//       .delete(`http://localhost:9000/admin/deleteUser/${userId}`)
//       .then((res) => {
//         alert("User deleted successfully!");
//         // Redirect or update the UI accordingly after deletion
//       })
//       .catch((err) => {
//         console.error("Error deleting user:", err);
//       });
//   };

 

//   return (
//     <>
//     <Navbar/>
//     <Container>
//     <Typography variant="h4" align="center" gutterBottom>View User</Typography> 
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>UserId</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Role</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {userDetails &&
//             userDetails.map((user) => (
//               <TableRow key={user._id}>
//                 <TableCell>{user._id}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={handleDeleteUser}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </Container>
//     </>
// )}

import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Container, Typography, IconButton, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, Button
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import AXIOS from "axios";


export default function ViewUser() {
  const [userDetails, setUserDetails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    AXIOS.get("http://localhost:9000/admin/view-user")
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
      });
  }, []);

  // Handle delete confirmation
  const handleOpenDialog = (userId) => {
    setSelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  // Handle user deletion
  const handleDeleteUser = () => {
    if (!selectedUserId) return;
    
    AXIOS.delete(`http://localhost:9000/admin/deleteUser`,{headers:{id:selectedUserId}})
      .then(() => {
        setUserDetails(userDetails.filter(user => user._id !== selectedUserId));
        handleCloseDialog();
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
  };

  return (
    <>
     
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          View Users
        </Typography>

        {userDetails.length === 0 ? (
          <Typography align="center" variant="h6" color="textSecondary">
            No user data available.
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell><strong>User ID</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userDetails.map((user,index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleOpenDialog(user._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteUser} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
