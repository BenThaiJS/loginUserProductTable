import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { incrementQuantity } from "../redux/reducers/cartSlice";

export const Dropdown = ({ qty, item }) => {
  const [qtySelected, setQtySelected] = useState(1);
  const quantity = Array.from({ length: qty }, (_, i) => i + 1);
  const dispatch = useDispatch();

  const handleATC = (e) => {
    e.preventDefault();
    dispatch(incrementQuantity({item, qtySelected}))
  };

  return (
    <form onSubmit={handleATC}>
      <div className='field'>
        <label className='label'>Qty</label>
        <div className='control'>
          <div className='select is-small'>
            <select
              value={qtySelected}
              onChange={(e) => setQtySelected(e.target.value)}
            >
              {quantity.map((number, index) => (
                <option value={number} key={index}>{number}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <button type='submit' className='button is-success'>
            Add to Cart
          </button>
        </div>
      </div>
    </form>
  );
};

export default Dropdown;
