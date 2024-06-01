import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPet.css';
import SideBar from '../components/Sidebar/SideBar';

const AddPet = () => {
  const [formData, setFormData] = useState({
    genre: '',
    sexe: '',
    age: '',
    description: '',
    prix: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://party_admin/api4/add', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data); // Debug: Log the response
      if (response.data.status === 1) {
        alert('Pet added successfully!');
        navigate('/Pets');
      } else {
        alert('Failed to add pet.');
      }
    } catch (error) {
      console.error('Error adding pet:', error); // Debug: Log the error
      alert('Failed to add pet.'); // Notify the user
    }
  };

  return (
    <div className="container">
      <div>
        <SideBar />
      </div>
      <h1>Add Pet</h1>
      <form className="form-container" onSubmit={handleSubmit} >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="genre">Genre:</label>
            <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="sexe">Sexe:</label>
            <input type="text" id="sexe" name="sexe" value={formData.sexe} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="prix">Prix:</label>
            <input type="number" id="prix" name="prix" value={formData.prix} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="sub">Ajouter</button>
      </form>
    </div>
  );
};

export default AddPet;
