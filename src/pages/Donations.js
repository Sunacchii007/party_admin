import React, { useState ,useEffect} from 'react';
import './Donations.css'; 
import axios from 'axios';
import SideBar from '../components/Sidebar/SideBar';
import { BsFillTrash3Fill,BsFillPencilFill } from "react-icons/bs";

export default function Donations () {
  const [donnees, setDonnees] = useState([]);

  useEffect(() => {
     
    getMessage()
 }, [])
   const getMessage = async () =>  {
   // Effectue la requête à l'API dès que le composant est monté
   axios.get(`http://localhost/party_admin/api5/`).then(function(response) {
         
   setDonnees(response.data);
})}
     console.log(donnees)
  
 
 
 const deleteMessage = (id) => {
   axios.delete(`http://localhost/party_admin/api5/${id}/delete`).then(function(response){
   alert('succ');
   getMessage();
});
}

  return (
    <div>
    <SideBar>
    <h1>Donations table :</h1>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th> Last Name </th>
            <th>Email</th>
            <th>Donation Amount </th>
            <th>Cards Number</th>
            <th>Message</th>
           
        
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donnees.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.donationAmount}</td>
              <td>{item.cardNumber}</td>
              <td>{item.message}</td>
              <td>
             
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










   

