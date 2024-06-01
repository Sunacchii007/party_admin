
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
import "./Updateorder.css";
import SideBar from "../components/Sidebar/SideBar";


const UpdateOrder = () => {


  const [order, setorder] = useState({
    nomComplet: "",
    adresse: "",
    email: "",
    telephone: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    gegetCorrespondancetorder();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setorder(prevorder => ({
      ...prevorder,
      [name]: value
    }));
  }

  function gegetCorrespondancetorder() {
    axios.get(`http://localhost/party_admin/api/${id}`)
      .then(function (response) {
        const orderData = response.data;
        const defaultorder = {
          nomComplet: "",
          adresse: "",
          email: "",
          telephone: "",
        };
        const updatedorder = { ...defaultorder, ...orderData };
        setorder(updatedorder);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost/party_admin/api/${id}/edit`, order)
      .then(function (response) {
        console.log(order);
        // alert(JSON.stringify(order)); 
        alert('Update sucessefuly');
        navigate('/Orders');
      })
  }

  return (
    <div className="container">
      <div><SideBar/></div>
      <h1>Update Orders information :</h1>
      <form className="form-container" method="post" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Nom Complet :</label>
            <input type="text" id="name" name="nomComplet" value={order.nomComplet} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="pname">Adresse :</label>
            <input type="text" id="adresse" name="adresse" value={order.adresse} onChange={handleChange} />
          </div>
          <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" value={order.email} onChange={handleChange} />
  </div>
  <div className="form-group">
    <label htmlFor="phoneNumber">Telephone :</label>
    <input type="tel" id="phoneNumber" name="telephone" value={order.telephone} onChange={handleChange} />
  </div>

</div>

<div className="form-row">

  </div>    

        <button type="submit" className="sub">Update</button>
      </form>
    </div>
  );
};

export default UpdateOrder;

