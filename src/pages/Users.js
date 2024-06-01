import React, { useState ,useEffect} from 'react';
import './Users.css'; 
import axios from 'axios';
import UpdateForm from './Update';
import { Link } from "react-router-dom";
import SideBar from '../components/Sidebar/SideBar';
import { BsFillTrash3Fill,BsFillPencilFill } from "react-icons/bs";

export default function Users () {
  const [donnees, setDonnees] = useState([]);

  useEffect(() => {
     
    getMessage()
 }, [])
   const getMessage = async () =>  {
   // Effectue la requête à l'API dès que le composant est monté
   axios.get(`http://localhost/party_admin/api2/`).then(function(response) {
         
   setDonnees(response.data);
})}
     console.log(donnees)
  
 
 
 const deleteMessage = (id) => {
   axios.delete(`http://localhost/party_admin/api2/${id}/delete`).then(function(response){
   alert('succ');
   getMessage();
});
}

  return (
    <div>
    <SideBar>
    <h1>Clients table :</h1>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom Complet</th>
            <th> Adresse </th>
            <th>Email</th>
            <th>Phone Number</th>
           
        
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donnees.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nomComplet}</td>
              <td>{item.adresse}</td>
              <td>{item.email}</td>
              <td>{item.telephone}</td>
              <td>
              <td>
                <Link to={`/Update/${item.id}/edit`}>
                <button className='update'>Update</button>
                </Link>
              </td>
              <td ><button onClick={() => deleteMessage( item.id  )} className='delete' ><BsFillTrash3Fill/></button></td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </SideBar></div>
  );
};










   

