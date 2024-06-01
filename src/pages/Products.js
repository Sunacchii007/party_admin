
import React, { useState ,useEffect} from 'react';
import './Product.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import SideBar from '../components/Sidebar/SideBar';
import { BsFillTrash3Fill,BsFillPencilFill } from "react-icons/bs";

export default function Product () {
  const [donnees, setDonnees] = useState([]);

  
  useEffect(() => {
     
    getMessage()
 }, [])
   const getMessage = async () =>  {
   axios.get(`http://localhost/party_admin/api3/`).then(function(response) {
         
   setDonnees(response.data);
})}
     console.log(donnees)
  
 
 
 const deleteMessage = (id) => {
   axios.delete(`http://localhost/party_admin/api3/${id}/delete`).then(function(response){
   alert('succ');
   getMessage();
});
}

  return (
    <div>
    <SideBar>
    <h1>Products table :</h1>
    <div>
              <Link to={`/AddProduct`}>
                <button >ADD</button>
                </Link></div>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th> Nom </th>
            <th>Prix</th>
           
        
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donnees.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              {/* <td>{product.image}</td> */}
              <td> <img src={product.image}  alt="img" style={{ width: '150px', height: '150px' }} className="card_img"></img></td>

              <td>{product.nom}</td>
              <td>{product.prix}</td>
              <td>
              
               
                <td>
                <Link to={`/UpdateProduct/${product.id}/edit`}>
                <button >Update</button>
                </Link></td> <td ><button onClick={() => deleteMessage( product.id  )} className='delete' ><BsFillTrash3Fill/></button></td>
             
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </SideBar></div>
  );
};










   



