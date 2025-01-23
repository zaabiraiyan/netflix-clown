import netflix from "../images/netflix.png"
import React from 'react'
import {signInWithPopup} from "firebase/auth"
import { Button } from '@mui/material'
import { auth, googleauth } from "../firebase/setup"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Sign = () => {
    const nav=useNavigate()
    
        const googlesignin=async()=>{
          try{
           await signInWithPopup(auth,googleauth)
           setTimeout(() => {
            auth.currentUser ?.emailVerified &&  nav("/")  
           },2000);
          toast.success("login successfully")

          }catch(err){
            console.error(err)
          }
          
        }
        console.log(auth.currentUser)
  return (
    
    <div style={{backgroundColor:"#181818" ,height:"100vh"}}>
      <ToastContainer autoClose={2000}/>
        <img style={{width:"100px",height:"100px",position:"fixed" ,left:"1%"}} src={netflix}/>
        <div style={{position:"fixed" ,left:"45%",top:"45%"}}>
            
        <Button onClick={googlesignin} variant="contained" color="error">SignIn</Button>
        <br/>
        <h2 style={{color:"white",position:"fixed" ,left:"38%",top:"50%"}} > Explore Unlimited movies</h2>
        </div>
      

    </div>
  )
}

export default Sign
  
