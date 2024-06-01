import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
 import "./Update.css";
import SideBar from "../components/Sidebar/SideBar";
const UpdateForm = () => {


  const [user, setUser] = useState({
    nomComplet: "",
    adresse: "",
    email: "",
    telephone: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    gegetCorrespondancetUser();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function gegetCorrespondancetUser() {
    axios.get(`http://localhost/party_admin/api2/${id}`)
      .then(function (response) {
        const userData = response.data;
        const defaultUser = {
          nomComplet: "",
          adresse: "",
          email: "",
          telephone: "",
        };
        const updatedUser = { ...defaultUser, ...userData };
        setUser(updatedUser);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost/party_admin/api2/${id}/edit`, user)
      .then(function (response) {
        console.log(user);
        // alert(JSON.stringify(user));
        alert('Update sucessefuly');
        navigate('/users');
      })
  }

  return (
    <div className="container">
      <div><SideBar/></div>
      <h1>Update clients information :</h1>
      <form className="form-container" method="post" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nom Complet :</label>
            <input type="text" id="name" name="nomComplet" value={user.nomComplet} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="pname">Adresse :</label>
            <input type="text" id="adresse" name="adresse" value={user.adresse} onChange={handleChange} />
          </div>
          <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
  </div>
  <div className="form-group">
    <label htmlFor="phoneNumber">Telephone :</label>
    <input type="tel" id="phoneNumber" name="telephone" value={user.telephone} onChange={handleChange} />
  </div>

</div>

<div className="form-row">

  </div>    

        <button type="submit" className="sub">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
















