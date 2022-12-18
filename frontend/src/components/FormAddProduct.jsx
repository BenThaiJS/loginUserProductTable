import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

const FormAddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState({});
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    _.forEach(image, (file) => formData.append("image", file));
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);

    try {
      await axios.post("http://localhost:5000/products", formData);
      navigate("/products");
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className='title'>Products</h1>
      <h2 className='subtitle'>Add New Product</h2>
      <div className='card is-shadowless'>
        <div className='card-content'>
          <div className='content'>
            <form
              onSubmit={saveProduct}
              encType='multipart/form-data'
              method='post'
            >
              <p className='has-text-centered'>{msg}</p>
              <div className='field'>
                <label className='label'>Name</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Product Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Price</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Description</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Quantity</label>
                <div className='control'>
                  <input
                    type='number'
                    className='input'
                    placeholder='0'
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Image</label>
                <div className='control'>
                  <input
                    type='file'
                    className='input'
                    name='image'
                    onChange={(e) => setImage(e.target.files)}
                    multiple
                  />
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <button type='submit' className='button is-success'>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;
