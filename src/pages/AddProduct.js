import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';
import SideBar from '../components/Sidebar/SideBar';

const AddProduct = () => {
  const [product, setProduct] = useState({
    nom: '',
    prix: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out empty fields
    const filledProduct = Object.fromEntries(
      Object.entries(product).filter(([_, value]) => value)
    );

    try {
      const response = await axios.post('http://localhost/party_admin/api4/', filledProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.status === 1) {
        alert('Product added successfully!');
        navigate('/product'); // Redirect to the product listing page
      } else {
        alert(response.data.message || 'Failed to add product.');
      }
    } catch (error) {
      console.error('There was an error adding the product!', error);
      alert('There was an error adding the product! Check the console for more details.');
    }
  };

  return (
    <div className="container">
      <div>
        <SideBar />
      </div>
      <h1>Add Product</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nom">Nom:</label>
            <input type="text" id="nom" name="nom" value={product.nom} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="prix">Prix:</label>
            <input type="number" id="prix" name="prix" value={product.prix} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="sub">Ajouter</button>
      </form>
    </div>
  );
};

export default AddProduct;
