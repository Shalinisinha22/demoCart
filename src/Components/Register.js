
import React,{useState,useEffect} from "react";
import { isLoaded } from 'react-redux-firebase'
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { register } from "../redux/allAction";
import { CircularProgress } from "@mui/material";
  function Register(props) {
 
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    const [name,setName]=useState("")
    const [number,setNumber]=useState("")


    useEffect(() => {
      if(props.auth?.uid){
        navigate('/')
      }
    }, [props])


    const handleEmail= (e)=>{
      setEmail(e.target.value);
      }

      const handlePassword=(e)=>{
        setPassword(e.target.value);
      }

      const handlename=(e)=>{
        setName(e.target.value)
      }
      const handleNumber=(e)=>
      {
        setNumber(e.target.value)
      }
   
  const onSubmit=async()=>{
    
  const res=await props.register({email:email,password:password,phoneNumber:number,name:name})

   if(props.auth.uid!=null){
      navigate("/")
  }
  
    
  }

 
    return (
     <>
     {/* To save from multiple request  */}

    {
     !isLoaded(props.auth)?<></>:
    <>
        {props.authMine.loading?<h4 style={{marginTop:'10%',height:'52vh',textAlign:"center"}}><CircularProgress></CircularProgress></h4>:
          <div className="container med contact">
            <div className="section funnel-section">
                <div className="form-card">
               
                    <h2 className="form-heading center">Enter your details</h2>
                    <div className="form-section">
                        <div className="input-group full"><label>Email</label>
                            <div className="effect"><input type="text" name="email" value={email||''}  onChange={handleEmail}  /><span></span>
                            </div>
                        </div>
                        <div className="input-group full"><label>username</label>
                            <div className="effect"><input type="text" name="name" value={name||''}  onChange={handlename}  /><span></span>
                            </div>
                        </div>
                        <div className="input-group full"><label>phoneNumber</label>
                            <div className="effect"><input type="number" name="number" value={number||''}  onChange={handleNumber}  /><span></span>
                            </div>
                        </div>
                       

                        <div className="input-group full"><label>Password</label>
                            <div className="effect"><input  type="password" name="password"  value={password||''} onChange={handlePassword}/><span></span>
                            </div>
                        </div>
                        {props.authMine?.error?<div className="input-group full">
                                <span className="error-message" >{props.authMine.error}</span> 
                        </div> :<></>}
                        <div className="form-buttons">
                            <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Register</button>
                        </div>
                       
                    </div>
                </div>

            </div>
       </div>
      }   
       </>
  }

  </>
    );

   
  }

  const mapStateToProps=(state)=>{
    return{
      authMine:state.Cartreducer,
      auth:state.firebase.auth
    }
  }

  const mapDispatchToProps=(dispatch)=>{
    return{
      register:(userData)=>{dispatch(register(userData))}
    }
  }




  export default connect(mapStateToProps,mapDispatchToProps) (Register)