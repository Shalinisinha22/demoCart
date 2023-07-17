import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { addToCart, removeFromWishlist } from "../redux/allAction";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";



function Media(props) {

    const handleCart=async(item,id)=>{
       await props.addToCart(item,id);
       props.removeFromWishlist(id)
    }
  return (
    <>
      <Grid container wrap="wrap"  >
        {props.wishlist.length==0
          ? <> <h1 style={{ margin:"0 25%" ,display:"block"}}>
                            Your wishlist 😔 is empty
            </h1></>
          : props.wishlist
        .map((item, index) => (
          <Box
            key={index}
            sx={{ width: {xs:"17rem", sm:"22rem"}, height:"25rem", margin:{xs:"3rem 1rem",sm:"5rem 2rem"} ,position:"relative",boxShadow:" rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}
            
          >
            {item ? (
              <>
                <Fab onClick={()=>props.removeFromWishlist(item.id)} size="small" sx={{position:"absolute",right:"2%",color:"#f1f2f6",top:"1%"}} aria-label="add">
                  <CloseIcon sx={{fontSize:"0.95rem",color:"#a4b0be"}}/>
                </Fab>
                <img
                  style={{
                    width: "100%",
                    height: "15rem",
  
                  }}
                  alt={item.title}
                  src={item.images[0]}
                />
              </>
            ) : (<></>
           
           
            )}

            {item ? (
              <Box sx={{ padding:"1rem" }}>
                <Typography gutterBottom variant="body2">
                  {item.title}
                </Typography>
                <Typography
                  display="block"
                  variant="caption"
                  color="text.secondary"
                >
                  {`Rs ${item.price}   ( ${item.discountPercentage}% OFF)`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {`only ${item.stock} items left  • ${item.rating} ⭐`}
                </Typography>

                <br></br>
                <Button onClick={() => handleCart(item, item.id)}>
                  Add to Cart
                </Button>
             
               
              </Box>
            ) : (
                <></>
          
            )}
          </Box>
        ))}
      </Grid>
    </>
  );
}

function WishlistPage(props) {
  return (
    <div>
      <Box
    
        sx={{
       
          margin: "8rem 2rem",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          width:"100vw",
         
        }}
      >
        <Media wishlist={props.wishlist} addToCart={props.addToCart} removeFromWishlist={props.removeFromWishlist} />
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.Cartreducer.wishlist,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, id) => dispatch(addToCart(item, id)),
    removeFromWishlist: (id) => dispatch(removeFromWishlist(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
