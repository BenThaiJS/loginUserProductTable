import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ReviewProduct from "./pages/ReviewProduct";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path='/resetPassword/:id/:token' element={<ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/add' element={<AddUser />} />
          <Route path='/users/edit/:id' element={<EditUser />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/add' element={<AddProduct />} />
          <Route path='/products/edit/:id' element={<EditProduct />} />
          <Route path='/products/reviews/:id' element={<ReviewProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
