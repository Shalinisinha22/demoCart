
import * as action from "./action";
// /import * as action from "./action";

export const addToCart=(item,id)=>{
    return{
        type:action.Add_To_CART,
        payload:{
            id:id,
            item:item
        }
    }
}

export const viewItem=(item)=>{
    return{
        type:action.VIEW_ITEM,
        payload:item
            
        
    }
}

export const updateQty=(id,qty)=>{
  return{
    type:action.UPDATE_QTY,
    payload:{
        id:id,
        qty:qty
    }
  }
}

export const removeItem=(id)=>{
    return{
        type:action.REMOVE_ITEM,
        payload:id
    }
}



export const search=(value)=>{
    return{
     type:action.SEARCH,
     payload:value
    }
 }

 export const addToWishlist = (product) => ({
    type: action.ADD_TO_WISHLIST,
    payload: product,
  });
  
  export const removeFromWishlist = (productId) => ({
    type:action.REMOVE_FROM_WISHLIST,
    payload: productId,
  });

 




//signup
 const registerReq=()=>{
    return{
        type:action.SIGN_UP_REQ,

    }
}
 const registerSucc=()=>{
    return{
        type:action.SIGN_UP_SUCC

    }
}

 const registerFail=(error)=>{
    return{
        type:action.SIGN_UP_FAIL,
        payload:error.message

    }
}

 const removeError=()=>{
    return{
        type:action.REMOVE_ERROR
    }
 }


 export const register=(userData)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        dispatch(registerReq())
      
            const firebase=getFirebase();
           const firestore=getFirestore();
           firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password).then(async(data)=>{
              const res=await firestore.collection('users').doc(data.user.uid).set({
                email:userData.email,
                name:userData.name,
                phoneNumber:userData.phoneNumber,
                cart:[],
                wishlist:[]
              }) 
              //success
             dispatch(registerSucc())       
           }).catch((error)=>{
               dispatch(registerFail(error))
               setTimeout(() => {
                  dispatch(removeError())
               }, 2000);
           })
    }
   }   


    
   //sign-in

   const loginReq=()=>{
    return{
        type:action.SIGN_IN_REQ
    }
   }
   const loginSucc=()=>{
    return{
        type:action.SIGN_IN_SUCC
    }
   }

   const loginFail=(error)=>{
     return{
        type:action.SIGN_IN_FAIL,
        payload:error.message
     }
   }

   export const login= (userData)=>{
    return async(dispatch,getState,{getFirebase,getFirestore})=>{
       dispatch(loginReq())
       const firebase=getFirebase()
       try{
           const res= await firebase.auth().signInWithEmailAndPassword(userData.email,userData.password)
           //success
           dispatch(loginSucc())
       }
       catch(error){
         dispatch(loginFail(error))
         setTimeout(() => {
           dispatch(removeError())   
         },2000);
       }
    }
   }
    


//logout

   const logoutReq=()=>{
         return{
            type:action.SIGN_OUT_REQ
         }
   }
   const logoutSucc=()=>{
    return{
       type:action.SIGN_OUT_SUCC
    }
}
const logoutFail=(error)=>{
    return{
       type:action.SIGN_OUT_FAIL,
       payload:error.message
    }
}

export const logout=()=>{
    return async(dispatch,getState,{getFirebase,getFirestore})=>{
        dispatch(logoutReq())
        const firebase=getFirebase()
        try{
          const res=await firebase.auth().signOut()
          dispatch(logoutSucc())
        }
        catch(error){
            dispatch(logoutFail(error))
            setTimeout(() => {
                dispatch(removeError())
            }, 5000);
        }
    } 
}


