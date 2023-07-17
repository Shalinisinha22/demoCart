import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Product from './Components/Product';
import SingleItem from './Components/SingleItem';
import { BrowserRouter,Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from './Components/Cart';
import WishlistPage from './Components/WishlistPage';
import Login from './Components/Login';
// import SignUp from "./Components/Register";
import PrivateRoute from './Components/PrivateRoute';
import Register from './Components/Register';

function App(props) {

 
  return (

  
    <div className="App">
 

 <BrowserRouter>
    {/* <Navbar></Navbar> */}
    

    <Routes>

      <Route exact path="/" element={<PrivateRoute><Navbar></Navbar><Product></Product></PrivateRoute>}></Route>
      <Route exact path="/cart" element={<PrivateRoute><Cart></Cart></PrivateRoute>}></Route>
      <Route exact path="/wishlist" element={<PrivateRoute><WishlistPage></WishlistPage></PrivateRoute>}></Route>
      <Route exact path="/login" element={<Login></Login>}></Route>
      <Route exact path="/register" element={<Register></Register>}></Route> 
      
    </Routes>  

{props.currItem ?
<Routes><Route exact path="/product/:id" element={<SingleItem></SingleItem>}></Route></Routes>:

  // <Navigate to="/"></Navigate>
  null
}



</BrowserRouter>

    
    </div>
  
  );
}


const mapStateToProps=(state)=>{
  return{
    currItem:state.Cartreducer.currItem
  }
}
export default connect(mapStateToProps) (App);
