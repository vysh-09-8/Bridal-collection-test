import { Routes, Route } from "react-router-dom";
import AddBridalWearForm from "./components/admin/addbridalwear";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import BridalWear from "./components/admin/viewbridalWear";
import Editbridal from "./components/admin/editbridal";
import AddJewellery from "./components/admin/addbridaljewellery";
import ViewBridalJewellery from "./components/admin/viewbridaljewellery";
import Login from "./components/user/login";
import Registration from "./components/user/registration";
import UserHome from "./components/user/userhome";
import AdminDashboard from "./components/admin/adminDashboard";
import ViewProduct from "./components/user/viewproduct";
import ViewJewellery from "./components/user/viewJewellery";
import Singlejewellery from "./components/user/singlejewellery";
import Viewcart from "./components/user/viewcart";
import Homepage from "./components/homepage";
import ViewUser from "./components/admin/viewuser";
import BuyerHome from "./components/wholesaler/buyerHome";
import BuyerViewProduct from "./components/wholesaler/buyerViewProduct";
import ViewAuction from "./components/admin/viewAuction";
import Payment from "./components/user/payment";
import Myorders from "./components/user/myorders";
import MyOrders from "./components/admin/orders";
import Favourite from "./components/user/favourite";

function App() {
  return (
    <Routes>
      {/* Starting page */}
      <Route path="/" element={<Homepage />} />
      <Route path="/buyerhome" element={<BuyerHome />} />
      <Route path="/buyerhome/view-product/:id" element={<BuyerViewProduct />} />

      {/* User routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/userhome/view-product/:id" element={<ViewProduct />} />
      <Route path="/userhome/view-jewellery-user" element={<ViewJewellery />} />
      <Route path="/userhome/view-jewellery/:id" element={<Singlejewellery />} />
      <Route path="/userhome/view-cart" element={<Viewcart />} />
      <Route path="/userhome/payment" element={<Payment/>}/>
      <Route path="/userhome/order" element={<Myorders/>}/>
      <Route path="/userhome/viewfavourites" element={<Favourite/>}/>

      {/* Admin routes (NESTED INSIDE ADMIN DASHBOARD) */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="viewbridal" element={<BridalWear />} />
        <Route path="addbridal" element={<AddBridalWearForm />} />
        <Route path="editbridal/:id" element={<Editbridal />} />
        <Route path="addjewellery" element={<AddJewellery />} />
        <Route path="viewuser" element={<ViewUser />} />
        <Route path="viewjewellery" element={<ViewBridalJewellery />} />
        <Route path="viewauction" element={<ViewAuction/>}/>
        <Route path="orders" element={<MyOrders/>}/>
      </Route>
    </Routes>
  );
}

export default App;
