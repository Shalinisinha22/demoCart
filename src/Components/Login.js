
import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router";
import { login } from "../redux/allAction";
import { connect } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";


  function Login(props) {
    console.log(props);
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
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


 const onSubmit=async()=>{
    
      let obj = {email:email,password:password}
      console.log(obj)
   const res=  await props.login(obj)
    if(props.auth.uid!=null){
    navigate("/")
   }
 
     

    }


    return (
      <>
      {/* If we visit the login being signed in we will be unable to see the form */}
      <>
      {props.authMine.loading?<h4 style={{marginTop:'10%',height:'52vh',textAlign:"center"}}>
        <CircularProgress /> 
    </h4>:
          <div className="container med contact">
            <div className="section funnel-section">
                <div className="form-card">
                    <h2 className="form-heading center">Enter Login details</h2>
                    <div className="form-section">
                        <div className="input-group full"><label>Email</label>
                            <div className="effect"><input type="text" name="email" value={email || ''}  onChange={handleEmail}  /><span></span>
                            </div>
                        </div>

                        <div className="input-group full"><label>Password</label>
                            <div className="effect"><input  type="password" name="password"  value={password || ''} onChange={handlePassword}/><span></span>
                            </div>
                        </div>
                        {props.authMine?.error?<div className="input-group full">
                                <span className="error-message" >{props.authMine.error}</span> 
                        </div> :<></>}  
                        <div className="form-buttons">
                            <button onClick={onSubmit} className="btn hvr-float-shadow" type='button'>Login</button>
                         <Link to="/register">  <button  className="btn hvr-float-shadow">signup</button></Link> 
                        </div>
                    </div>
                </div>

            </div>
        </div>
  }
  </>
  
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
    login:(userData)=>{dispatch(login(userData))}
  }
}

 


  export default connect(mapStateToProps,mapDispatchToProps) (Login)