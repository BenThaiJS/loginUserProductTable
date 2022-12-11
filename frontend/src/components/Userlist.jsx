/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { capitalizeFirstLetter } from "../utils/functions";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getUsers();
  }, [page, keyword]);

  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:5000/users/?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setUsers(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
  };

  return (
    <div>
      <h1 className='title'>Users</h1>
      <h2 className='subtitle'>List of Users</h2>
      <Link to='/users/add' className='button is-primary mb-2'>
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
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}> 
              <td>{index + 1}</td>
              <td>
                {user.image ? (
                  <figure className='image is-48x48'>
                    <img
                      src={`http://localhost:5000/${user.image}`}
                      alt={user.name}
                    />
                  </figure>
                ) : (
                  ""
                )}
              </td>
              <td>{capitalizeFirstLetter(user.name)}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className='button is-small is-info'
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className='button is-small is-danger'
                >
                  Delete
                </button>
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

export default Userlist;
