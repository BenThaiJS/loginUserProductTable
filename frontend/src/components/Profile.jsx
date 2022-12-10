import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState({});
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name ? response.data.name : "");
        setEmail(response.data.email ? response.data.email : "");
        setAddress(response.data.address ? response.data.address : "");
        setCity(response.data.city ? response.data.address : "");
        setState(response.data.state ? response.data.state : "");
        setZip(response.data.zip ? response.data.zip : "");
        setCountry(response.data.country ? response.data.country : "");
        setPhone(response.data.phone ? response.data.phone : "");
        setRole(response.data.role ? response.data.role : "");
      } catch (err) {
        if (err.response) {
          setMsg(err.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("zip", zip);
    formData.append("country", country);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("role", role);
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, formData);
      navigate("/users");
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className='title'>Account</h1>
      <h2 className='subtitle'>Update Profile</h2>
      <div className='card is-shadowless'>
        <div className='card-content'>
          <div className='content'>
            <form onSubmit={updateUser}>
              <p className='has-text-centered'>{msg}</p>
              <div className='field'>
                <label className='label'>Name</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Email</label>
                <div className='control'>
                  <input
                    type='email'
                    className='input'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Address</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='123 Abc...'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>City</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>State</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='State'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Zip</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Zip'
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Country</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Phone</label>
                <div className='control'>
                  <input
                    type='text'
                    className='input'
                    placeholder='Phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
              <div className='field'>
                <label className='label'>Password</label>
                <div className='control'>
                  <input
                    type='password'
                    className='input'
                    placeholder='*******'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Confirm Password</label>
                <div className='control'>
                  <input
                    type='password'
                    className='input'
                    placeholder='*******'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <button type='submit' className='button is-success'>
                    Update
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

export default Profile;
