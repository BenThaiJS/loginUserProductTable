import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  isRequired,
  isBetween,
  isEmailValid,
  isPasswordSecure,
} from "../utils/functions";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const checkUsername = (name) => {
    let valid = false;
    const min = 3;
    const max = 25;
    name?.trim()
    if (!isRequired(name)) {
      setNameErrorMsg("Username cannot be blank.");
    } else if (!isBetween(name?.length, min, max)) {
      setNameErrorMsg(`Username must be between ${min} and ${max} characters.`);
    } else {
      setNameErrorMsg("");
      valid = true;
    }
    return valid;
  };

  const checkEmail = (email) => {
    let valid = false;
    email?.trim();
    if (!isRequired(email)) {
      setEmailErrorMsg("Email cannot be blank.");
    } else if (!isEmailValid(email)) {
      setEmailErrorMsg("Email is not valid.");
    } else {
      setEmailErrorMsg("");
      valid = true;
    }
    return valid;
  };

  const checkPassword = (password) => {
    let valid = false;
    password?.trim();
    if (!isRequired(password)) {
      setPasswordErrorMsg("Password cannot be blank.");
    } else if (!isPasswordSecure(password)) {
      setPasswordErrorMsg(
        "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
      );
    } else {
      setPasswordErrorMsg("");
      valid = true;
    }
    return valid;
  };

  const checkConfirmPassword = (password, confirmPassword) => {
    let valid = false;
    // check confirm password
    confirmPassword?.trim();
    password?.trim();

    if (!isRequired(confirmPassword)) {
      setConfirmPasswordErrorMsg("Please enter the password again");
    } else if (password !== confirmPassword) {
      setConfirmPasswordErrorMsg("The password does not match");
    } else {
      valid = true;
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate forms
    let isUsernameValid = checkUsername(name),
      isEmailValid = checkEmail(email),
      isPasswordValid = checkPassword(password),
      isConfirmPasswordValid = checkConfirmPassword(password, confirmPassword);

    let isFormValid =
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {
      try {
        const response = await axios.post("http://localhost:5000/users", {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          role: role,
        });
        setMsg(response.data.msg);
        setTimeout(() => navigate("/"), 2000);
      } catch (err) {
        if (err.response) {
          setMsg(err.response.data.msg);
        }
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
                  <p style={{color: "red", fontSize: "12px"}}>{nameErrorMsg}</p>
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
                  <p style={{color: "red", fontSize: "12px"}}>{emailErrorMsg}</p>
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
                  <p style={{color: "red", fontSize: "12px"}}>{passwordErrorMsg}</p>

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
                  <p style={{color: "red", fontSize: "12px"}}>{confirmPasswordErrorMsg}</p>

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
