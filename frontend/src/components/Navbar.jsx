import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../redux/reducers/authSlice";
import { FaShoppingCart } from "react-icons/fa";
import { formatCurrency } from "../utils/functions";
import { clearCart } from "../redux/reducers/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const logout = () => {
    dispatch(LogOut());
    dispatch(clearCart());
    dispatch(reset());
    navigate("/");
  };

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    const newTotalPrice = formatCurrency(totalPrice);
    return { newTotalPrice, totalQuantity };
  };

  return (
    <div>
      <nav
        className='navbar is-fixed-top has-shadow'
        role='navigation'
        aria-label='main navigation'
      >
        <div className='navbar-brand'>
          <NavLink to={"/dashboard"} className='navbar-item'>
            <img
              src='https://bulma.io/images/bulma-logo.png'
              width='112'
              height='28'
              alt='logo'
            />
          </NavLink>

          <a
            href='!#'
            role='button'
            className='navbar-burger burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
          >
            <span aria-hidden='true' />
            <span aria-hidden='true' />
            <span aria-hidden='true' />
          </a>
        </div>

        <div id='navbarBasicExample' className='navbar-menu'>
          <div className='navbar-end'>
            <div className='navbar-item'>
              {/* <p>Total: {getTotal().newTotalPrice}</p> */}
              <div className='buttons'>
                <button
                  className='button is-info is-light'
                  onClick={() => navigate("/checkout")}
                >
                  <FaShoppingCart />
                  <div className='ml-2'>{getTotal().totalQuantity}</div>
                </button>
                <button onClick={logout} className='button is-warning'>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
