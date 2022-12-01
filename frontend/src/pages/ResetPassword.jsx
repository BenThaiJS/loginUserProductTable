import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const { id, token } = useParams();

  console.log(`http://localhost:5000/resetPassword/${id}/${token}`)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/resetPassword/${id}/${token}`, {
        newPassword: newPassword,
      });
      setMsg(response.data.msg);
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  if(msg === "Password updated") {
    
  }

  return (
    <section className='hero has-background-grey-light is-fullheight is-fullwidth'>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-4'>
              <form onSubmit={handleSubmit} className='box' method='post'>
                <p className='has-text-centered'>{msg}</p>
                <h1 className='title is-2'>Reset Password</h1>
                <div className='field'>
                  <label className='label'>New Password</label>
                  <div className='control'>
                    <input
                      type='password'
                      className='input'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder='New Password'
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='button is-success is-fullwidth'
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
