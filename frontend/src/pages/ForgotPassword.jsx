import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/forgotPassword", {
        email: email,
      });
      setMsg(response.data.msg);
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
                <h1 className='title is-2'>Forgot Password</h1>
                <div className='field'>
                  <label className='label'>Email</label>
                  <div className='control'>
                    <input
                      type='email'
                      className='input'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Email'
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='button is-success is-fullwidth'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
