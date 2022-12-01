/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { formatCurrency } from "../utils/formatCurrency";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getProducts();
  }, [page, keyword]);

  const getProducts = async () => {
    const response = await axios.get(
      `http://localhost:5000/products/?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setProducts(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
  };

  const addToCart = () => {};
  const minusFromCart = () => {};

  return (
    <div>
      <h1 className='title'>Products</h1>
      <h2 className='subtitle'>List of Products</h2>
      <Link to='/products/add' className='button is-primary mb-2'>
        Add new
      </Link>
      <form onSubmit={searchData}>
        <div className='field has-addons mt-3'>
          <div className='control is-expanded'>
            <input
              type='text'
              className='input'
              placeholder='Find something here...'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className='control'>
            <button type='submit' className='button is-info'>
              Search
            </button>
          </div>
        </div>
      </form>
      <table className='table is-striped is-fullwidth mt-3'>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
            <th>Reviews</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>
                {product.image ? (
                  <figure className='image is-48x48'>
                    <img
                      src={`http://localhost:5000/${product.image}`}
                      alt={product.name}
                    />
                  </figure>
                ) : (
                  ""
                )}
              </td>
              <td>{product.name}</td>
              <td>{formatCurrency(product.price)}</td>
              <td>{product.user.name}</td>
              <td>
                <Link
                  to={`/products/edit/${product.uuid}`}
                  className='button is-small is-info'
                >
                  Edit
                </Link>
                <button
                  onClick={(e) => deleteProduct(product.uuid)}
                  className='button is-small is-danger'
                >
                  Delete
                </button>
              </td>

              <td>
                <Link to={`/products/reviews/${product.uuid}`}>
                  Add Comments
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
      </p>
      <nav
        className='pagination is-centered'
        key={rows}
        role='navigation'
        aria-label='pagination'
      >
        <ReactPaginate
          previousLabel={"< Prev"}
          nextLabel={"Next >"}
          pageCount={Math.min(10, pages)}
          onPageChange={changePage}
          containerClassName={"pagination-list"}
          pageLinkClassName={"pagination-link"}
          previousLinkClassName={"pagination-previous"}
          nextLinkClassName={"pagination-next"}
          activeLinkClassName={"pagination-link is-current"}
          disabledLinkClassName={"pagination-link is-disabled"}
        />
      </nav>
    </div>
  );
};

export default ProductList;
