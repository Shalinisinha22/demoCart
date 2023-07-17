import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { Button, CircularProgress, TextField } from "@mui/material";
import { coupons } from "./coupons.js";
import "./Cart.css";
import { getFirestore } from 'redux-firestore';

function Cart({ cart = [] ,auth}) {
  console.log(cart.length);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [oldPrice, setoldPrice] = useState(null);
  const[myCart , setcart]=useState([])


  const firestore = getFirestore();

  useEffect(()=>{
    const unsub = firestore.collection("users").doc(auth.uid).onSnapshot((snapshot)=>{
        console.log(snapshot.data().cart)
        setcart(snapshot.data().cart)
    })
    return ()=> {unsub()}
   },[auth.uid])


  const getText = (e) => {
    setCoupon(e.target.value);
  };

  const ApplyCoupon = () => {
    console.log(coupon);

    let couponm = coupon.trim().toUpperCase();
    let obj = coupons[couponm];
    if (obj == undefined) {
      console.log("Coupon is not applicable");
      setSuccess(false);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      console.log(obj.discount);
      let discount = (totalPrice / 100) * obj.discount;
      let newPrice = Math.trunc(totalPrice - discount);
      setoldPrice(totalPrice);
      setTotalPrice(newPrice);
    }
  };
  const revert = () => {
    setTotalPrice(oldPrice);
    setoldPrice(null);
    setSuccess(null);
    setLoading(true);
    setCoupon("");
  };
  const tryAgain = () => {
    setSuccess(null);
    setLoading(true);
    setCoupon("");
  };

  useEffect(() => {
    let items = 0;
    let price = 0;

    myCart.forEach((item) => {
      items += Number(item.qty);
      price += item.qty * item.price;
      console.log(price);
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [myCart,totalItems]);
  return (
    <>
      {myCart.length == 0 ? (
        <>
          <h1 style={{ margin: "8rem", textAlign: "center" }}>
            {/* Your cart 😔 is empty */}
            <CircularProgress></CircularProgress>
          </h1>
        </>
      ) : (
        <div className="container-div">
          <div className="items">
            <div className="header">
              <h3
                style={{
                  paddingLeft: "2%",
                  marginBottom: "2%",
                }}
              >
                Your Bag
              </h3>
            </div>
            <div className="added">
              {myCart.map((item) => (
                <CartItem key={item.id} product={item} />
              ))}
            </div>
          </div>
          <div className="details-c">
            <div className="details">
              <h4 style={{ textAlign: "center", paddingTop: "5%" }}>
                Cart Summary
              </h4>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "5%",
                  marginTop: "5%",
                }}
              >
                <span>Subtotal ({totalItems} items) : </span>
                <span style={{ fontWeight: "bold" }}>₹ {totalPrice}</span>
              </div>

              <>
                {loading == true ? (
                  <div className="coupon">
                    <TextField
                      value={coupon}
                      style={{ marginRight: "2%" }}
                      id="standard-basic"
                      label="Enter code"
                      onChange={getText}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={ApplyCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                ) : (
                  <>
                    {success == true ? (
                      <div className="smsg">
                        <h4>Code applied !</h4>

                        <div className="revert">
                          <Button
                            onClick={revert}
                            size="small"
                            variant="contained"
                            color="secondary"
                          >
                            Revert
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="fmsg">
                        <h4>Not valid !</h4>
                        <div className="revert">
                          <Button
                            onClick={tryAgain}
                            size="small"
                            variant="contained"
                            color="secondary"
                          >
                            Try Again
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>

              <div className="checkout">
                <Button variant="contained" color="primary">
                  Proceed To Buy
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.Cartreducer.cart,
    auth:state.firebase.auth
  };
};

export default connect(mapStateToProps)(Cart);
