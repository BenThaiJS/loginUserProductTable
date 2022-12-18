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
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/signup' element={<SignUp />} />
            <Route
              path='/resetPassword/:id/:token'
              element={<ResetPassword />}
            />
            <Route path="/cart" element={<Cart/>}/>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/add' element={<AddUser />} />
            <Route path='/users/edit/:id' element={<EditUser />} />
            <Route path="/account/user/:id" element={<Account/>}/>
            <Route path='/products' element={<Products />} />
            <Route path='/products/add' element={<AddProduct />} />
            <Route path='/products/edit/:id' element={<EditProduct />} />
            <Route path='/products/reviews/:id' element={<ReviewProduct />} />
            <Route path="/checkout" element={<Checkout/>}/>
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
