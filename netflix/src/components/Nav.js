import { Button } from "@mui/material"
import netflix from "../images/netflix.png"
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/setup"
import { signOut } from "firebase/auth"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Nav = () => {
  const log=async()=>{
    try{
     await signOut(auth)
     toString.success("logegd out successfully",{
      theme:"dark"
     })
    }
    catch(err){
      console.error(err)
    }

  }

    const [movies,setmovies]=useState([])
    const navigate=useNavigate()
  const signinclick=()=>{
    navigate("/signin")

  }
    const getMovie=()=>{
        try{
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=2492540b5eab59bc08dc04ab12c31084")
        .then(res=> res.json())
        .then(json=>setmovies(json.results))
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        getMovie()
    },[])
    console.log(auth.currentUser?.email)
  return (
    <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original/${movies[13]?.poster_path})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover",height:"400px",width:"100%"}}>
      <ToastContainer autoClose={2000} />
      <div style={{display:"flex",justifyContent:"space-between" ,padding:"20px"}}>
      <img style={{width:"150px",height:"100px"}} src={netflix }></img>
      <div>
      {auth.currentUser?.emailVerified?<Button onClick={log} color='error' variant='contained' sx={{height:"40px" ,marginLeft:"10px"}}>Logout</Button>
      :<Button onClick={signinclick} color='error' variant='contained' sx={{height:"40px"}}>signin</Button>
}

      </div>
    
      </div>
      <div style={{padding:"20px"}} ><h1 style={{color:"#F1F1F1",fontSize:"30px",fontFamily:"initial",position:"left",marginLeft:"25px"}}>{movies[13]?.original_title}</h1>
      <h3 style={{color:"#F1F1F1",marginTop:"90px",marginLeft:"20px"}}>{movies[13]?.overview}</h3>
      <Button variant="contained" sx={{color:"black" ,bgcolor:"white",fontWeight:"bold",marginTop:"-300px"}}>Play Trailer</Button>  

      </div>
         
    </div>

    
  )
}

export default Nav