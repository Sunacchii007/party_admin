import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
 import "./UpdateProduct.css";
import SideBar from "../components/Sidebar/SideBar";
const UpdateProduct = () => {


  const [product, setproduct] = useState({
    image: "",
    nom: "",
    prix: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    gegetCorrespondancetproduct();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setproduct(prevproduct => ({
      ...prevproduct,
      [name]: value
    }));
  }

  function gegetCorrespondancetproduct() {
    axios.get(`http://localhost/party_admin/api3/${id}`)
      .then(function (response) {
        const productData = response.data;
        const defaultproduct = {
          image: "",
          nom: "",
          prix: "",
        };
        const updatedproduct = { ...defaultproduct, ...productData };
        setproduct(updatedproduct);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost/party_admin/api3/${id}/edit`, product)
      .then(function (response) {
        console.log(product);
        alert(JSON.stringify(product)); 
        navigate('/product');
      })
  }

  return (
    <div className="container">
      <div><SideBar/></div>
      <h1>Update products information :</h1>
      <form className="form-container" method="post" onSubmit={handleSubmit}>
        <div className="form-row">
           <div className="form-group">
            <label htmlFor="image">Image :</label>
            <input type="file" id="image" name="image" onChange={handleChange} />
          </div> 
          <div className="form-group">
            <label htmlFor="pname">Nom :</label>
            <input type="text" id="nom" name="nom" value={product.nom} onChange={handleChange} />
          </div>
    
  
          <div className="form-group">
            <label htmlFor="prix">Prix:</label>
           <input type="number" id="prix" name="prix" value={product.prix} onChange={handleChange} />
          </div>

</div>

<div className="form-row">

  </div>    

        <button type="submit" className="sub">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
