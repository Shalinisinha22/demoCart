import React from "react";
import { connect } from "react-redux";
import { updateQty, removeItem } from "../redux/allAction";
import { Button } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Cart.css";
import { useFirestore } from "react-redux-firebase";

function CartItem({ product, removeItem, updateqty,auth }) {
  let firestore=useFirestore()

  const handleQty = async(id, e) => {
    if (e.target.value > 0) {
      updateqty(id, e.target.value);
      let updatedQty=Number(e.target.value)
     
      let user=await firestore.collection('users').doc(auth.uid).get();
      user=user.data()
      let obj=[]
      obj=user.cart.map((product)=>product.id==id?{...product,qty:updatedQty}:product)
      console.log("obj",obj)
      await  firestore.collection('users').doc(auth.uid).update({
      cart:obj
     })
    }

    }

    const handleRemoveItem=async(id)=>{
      let user=await firestore.collection('users').doc(auth.uid).get();
      user=user.data()
      let obj=[]
      obj=user.cart.filter((product)=>product.id!==id)
      await  firestore.collection('users').doc(auth.uid).update({
      cart:obj
     })
    }
  
  return (
    <>
      <hr />
      <div className="itemContainer">
        <div className="imgc">
          <img
            className="cart-image"
            src={product.images[0]}
            alt={product.title}
          />
        </div>
        <div className="desc">
          <div className="itemName">
            <h3>{product.title}</h3>
          </div>
          <div className="itemQuantity">
            <label htmlFor="qty">Qty</label>
            <input
              min="1"
              type="number"
              id="qty"
              name="qty"
              value={product.qty}
              onChange={(e) => handleQty(product.id, e)}
              style={{ width: "3.5rem", marginLeft: "0.4rem" }}
              
            />
          </div>
          <div className="itemdesc">
            <p style={{ color: "#222f3e", textAlign: "center" }}>
              {product.description}
            </p>
          </div>
          <div className="pc">
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveItem(product.id)}
            >
              <DeleteIcon />
              Delete
            </Button>
            <h3 style={{ marginTop: "1%", marginLeft: "1%" }}>
              ₹ {product.price}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    // cart: state.Cartreducer.cart,
    auth:state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateqty: (id, qty) => dispatch(updateQty(id, qty)),
    removeItem: (id) => dispatch(removeItem(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
