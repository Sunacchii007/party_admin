
import React, { useState ,useEffect} from 'react';
import './Orders.css';
import axios from 'axios';
// import Updateorder from './Updateorder';
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
   axios.get(`http://localhost/party_admin/api/`).then(function(response) {
         
   setDonnees(response.data);
})}
     console.log(donnees)
  
 
 
 const deleteMessage = (id) => {
   axios.delete(`http://localhost/party_admin/api/${id}/delete`).then(function(response){
   alert('succ');
   getMessage();
});
}

  return (
    <div>
    <SideBar>
    <h1>Orders table :</h1>
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
          {donnees.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.nomComplet}</td>
              <td>{order.adresse}</td>
              <td>{order.email}</td>
              <td>{order.telephone}</td>
              <td>
                <td>
                <Link to={`/UpdateOrder/${order.id}/edit`}>
                <button >Update</button>
                </Link></td>
                <td ><button onClick={() => deleteMessage( order.id  )} className='delete' ><BsFillTrash3Fill/></button></td>
             
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </SideBar></div>
  );
};










   



