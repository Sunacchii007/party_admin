import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders"
import UpdateOrder from './pages/OrderUpdate';
import Pet from "./pages/Pets";
 import UpdatePet from "./pages/Updatepet";
import AddPet from "./pages/Addpets";
import AddProduct from "./pages/AddProduct";
import Product from "./pages/Products";
import Users from "./pages/Users";
import Donations from "./pages/Donations";
import UpdateProduct from "./pages/UpdateProduct";
import UpdateForm from "./pages/Update";
import Log from "./pages/log";


function App() {
  return (
    <Router>
        <Routes>
        <Route path="/"  exact element={<Log />} />
          <Route path="/users" element={<Users />} />
          <Route path="/pets" element={<Pet />} />
          <Route path="/donation" element={<Donations />} />
          <Route path="/Addpets" element={<AddPet />} />
          <Route path="/Addproduct" element={<AddProduct />} />
          <Route path="/product" element={<Product />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Update/:id/edit" element={<UpdateForm />} />
          <Route path="/UpdateProduct/:id/edit" element={<UpdateProduct />} />
          <Route path="/UpdateOrder/:id/edit" element={<UpdateOrder />} />
          <Route path="/UpdatePet/:id/edit" element={<UpdatePet />} />
          <Route path="*" element={<> not found</>} />
        
        </Routes>
    
    </Router>
  );
}

export default App;
