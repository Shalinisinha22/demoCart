import initialState from "./initialState.json";
import * as actionTypes from "./action";


const Cartreducer=(state=initialState,action)=>{
     switch(action.type){
         case actionTypes.Add_To_CART:
              const isPresent=state.cart.find((product)=>product.id==action.payload.id?true:false )

              return{
                ...state,
                 cart:isPresent?state.cart.map((product)=>product.id==action.payload.id?{...product,qty:product.qty+1}:product):
                
                     [...state.cart, {...action.payload.item,qty:1}]     
              }
          case actionTypes.VIEW_ITEM:
                return{
                    ...state,
                    currItem:action.payload
                    
                } 

          
                     
           
           case actionTypes.REMOVE_ITEM:
               return{
                  ...state,
                   cart: state.cart.filter((product)=>product.id!=action.payload)
               }

            case actionTypes.UPDATE_QTY:
               return{
                  ...state,
                  cart:state.cart.map((product)=>product.id==action.payload.id?{...product,qty:action.payload.qty}:product)
               }  
               
            
              case actionTypes.ADD_TO_WISHLIST:
                return{
                    ...state,
                    wishlist:[...state.wishlist,action.payload]
                }  
              case actionTypes.REMOVE_FROM_WISHLIST:
                return{
                    ...state,
                    wishlist:state.wishlist.filter((product)=>product.id!==action.payload)
                }   
                 
              case actionTypes.SEARCH:
                    return{
                        ...state,
                        searchText:action.payload
                    }  
                    
                    case actionTypes.SIGN_UP_REQ:
            return{
                ...state,loading:true
            }
        case actionTypes.SIGN_UP_SUCC:
            return{
                ...state,loading:false
            }
        case actionTypes.SIGN_UP_FAIL:
            return{
                ...state,loading:false,error:action.payload
            }
      
            
            case actionTypes.SIGN_IN_REQ:
                return{
                    ...state,loading:true
                }
            case actionTypes.SIGN_IN_SUCC:
                return{
                    ...state,loading:false
                }
            case actionTypes.SIGN_IN_FAIL:
                return{
                    ...state,loading:false,error:action.payload
                }
            
            
                case actionTypes.SIGN_OUT_REQ:
                    return{
                        ...state,loading:true
                    }
                case actionTypes.SIGN_OUT_SUCC:
                    return{
                        ...state,loading:false
                    }
                case actionTypes.SIGN_OUT_FAIL:
                    return{
                        ...state,loading:false,error:action.payload
                    }

               case actionTypes.REMOVE_ERROR:
                return{
                    ...state,error:""
                }  
                
                
            
          default: return state      
     } 
}

export default Cartreducer;