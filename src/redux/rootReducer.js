
import { combineReducers } from "redux"; 
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import Cartreducer from "./Cartreducer";
// import authReducer from "./reducer/authReducer";



export const rootReducer=combineReducers({
  
    firebase:firebaseReducer,
    firestore:firestoreReducer,
    // auth:authReducer,
    Cartreducer:Cartreducer



})