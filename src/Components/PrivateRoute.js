import React from 'react';
import { connect } from 'react-redux';
import {  Navigate } from 'react-router-dom';
import { isEmpty,isLoaded } from 'react-redux-firebase';

const PrivateRoute = ({ auth , children }) => {

  const user=isLoaded(auth) && !isEmpty(auth)
    if(user){
      return children
   
    }
 return(
  <Navigate to="/login"></Navigate>
 )
   
 
};

const mapStateToProps=(state)=>{
    return{
        auth:state.firebase.auth
    }
}

export default connect(mapStateToProps) (PrivateRoute)
