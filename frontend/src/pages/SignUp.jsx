import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role
      })
      setMsg(response.data.msg);
      navigate("/")
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  return (
    <section className='hero has-background-grey-light is-fullheight is-fullwidth'>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-4'>
              <form onSubmit={handleSubmit} className='box' method='post'>
                <p className='has-text-centered'>{msg}</p>
                <h1 className='title is-2'>Create an Account</h1>
                <div className='field'>
                  <label className='label'>Name</label>
                  <div className='control'>
                    <input
                      type='text'
                      className='input'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Name'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Email</label>
                  <div className='control'>
                    <input
                      type='email'
                      className='input'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Name'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Password</label>
                  <div className='control'>
                    <input
                      type='password'
                      className='input'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Password'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Confirm Password</label>
                  <div className='control'>
                    <input
                      type='password'
                      className='input'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder='Confirm Password'
                    />
                  </div>
                </div>
                <div className='field'>
                  <label className='label'>Role</label>
                  <div className='control'>
                    <div className='select is-fullwidth'>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option></option>
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  type='submit'
                  className='button is-success is-fullwidth'
                >
                  Create User Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
