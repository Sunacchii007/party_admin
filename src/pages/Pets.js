
import React, { useState ,useEffect} from 'react';
import './Pets.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import SideBar from '../components/Sidebar/SideBar';
import { BsFillTrash3Fill,BsFillPencilFill } from "react-icons/bs";

export default function Pet () {
  const [donnees, setDonnees] = useState([]);

  
  useEffect(() => {
    
    getMessage()
 }, [])
   const getMessage = async () =>  {
   axios.get(`http://localhost/party_admin/api4/`).then(function(response) {
         
   setDonnees(response.data);
})}
    //  console.log(donnees)
  
  
 
 const deleteMessage = (id) => {
   axios.delete(`http://localhost/party_admin/api4/${id}/delete`).then(function(response){
   alert('succ');
   getMessage();
});
}

  return (
    <div>
    <SideBar>
    <h1>pets table :</h1>
    <div>
              <Link to={`/Addpets`}>
                <button >ADD</button>
                </Link></div>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>genre</th>
            <th> sexe </th>
            <th>age</th>
            <th>description</th>
            <th>image</th>
            
           
        
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donnees.map(pet => (
            <tr key={pet.id}>
              <td>{pet.id}</td>
              <td>{pet.genre}</td>
              <td>{pet.sexe}</td>
              <td>{pet.age}</td>
              <td>{pet.description}</td>
              <td> <img src={pet.image}  alt="DoggoImg" style={{ width: '160px', height: '100px' }} className="card_img"></img></td>
              
              <td>
              
                <td>
                <Link to={`/UpdatePet/${pet.id}/edit`}>
                <button >Update</button>
                </Link></td>
                <td>
                
                <td ><button onClick={() => deleteMessage( pet.id  )} className='delete' ><BsFillTrash3Fill/></button></td>
                
              </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </SideBar></div>
  );
};










   



