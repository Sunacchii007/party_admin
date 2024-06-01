import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
import "./Updatepet.css";
import SideBar from "../components/Sidebar/SideBar";

const UpdatePet = () => {
  const [pet, setPet] = useState({
    genre: "",
    sexe: "",
    age: "",
    description: "",
    image: "",
    
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPetData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPet(prevPet => ({
      ...prevPet,
      [name]: value
    }));
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      setPet(prevPet => ({
        ...prevPet,
        image: fileName
      }));
    }
  }

  const getPetData = () => {
    axios.get(`http://localhost/party_admin/api4/${id}`)
      .then(response => {
        const petData = response.data;
        const defaultPet = {
          genre: "",
          sexe: "",
          age: "",
          description: "",
          image: "",
          
        };
        const updatedPet = { ...defaultPet, ...petData };
        setPet(updatedPet);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost/party_admin/api4/${id}/edit`, pet)
      .then(response => {
        console.log(pet);
        alert(JSON.stringify(pet)); 
        navigate('/Pets');
      })
  }

  return (
    <div className="container">
      <div><SideBar/></div>
      <h1>Update Pets information :</h1>
      <form className="form-container" method="post" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="genre">Genre :</label>
            <input type="text" id="genre" name="genre" value={pet.genre} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="sexe">Sexe :</label>
            <input type="text" id="sexe" name="sexe" value={pet.sexe} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" value={pet.age} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description :</label>
            <input type="text" id="description" name="description" value={pet.description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" name="image" onChange={handleFileChange} />
          </div> 
        </div>
        <button type="submit" className="sub">Update</button>
      </form>
    </div>
  );
};

export default UpdatePet;
