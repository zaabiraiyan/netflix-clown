import { Grid ,Button, TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import { auth, database } from '../firebase/setup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer'

const Moviedetail = () => {
    const [review,setreview]=useState('')
    const [reviewdata,setreviewdata]=useState([])
    const location=useLocation()
    
    const movieref =doc(database,"Movies",`${location.state.movie.id}`)
    const reviewref=collection(movieref,"Reviews")


    const addreview=async()=>{
            try{
                auth.currentUser && await  addDoc(reviewref,{
                    moviereview:review,
                    email:auth.currentUser?.email,
                    username:auth.currentUser?.displayName,
                    profile_image:auth.currentUser?.photoURL
                })
               auth.currentUser? toast.success("review added succesfully",{
                    theme:"dark"
                })
                :toast.warning("please login")
            }
            catch(err){
                console.error(err)
            }
    }
    const showreview=async()=>{
        try{
          const data= await getDocs(reviewref)
          const filterdata=data.docs.map((doc)=>({...doc.data(),
            id:doc.id
          })
        )
        setreviewdata(filterdata)
        }catch(err){
            console.error(err)
        }
       
    }
    useEffect(()=>{
        showreview()
    },[])

    

  return (
        <Grid container>
    
        
            <Grid item xs={8}>
            <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${location.state.movie?.poster_path})`,height:"100vh",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
            <ToastContainer autoClose={2000}/>
            <div style={{paddingTop:"500px",paddingleft:"300px",paddingRight:"10px",fontFamily:"initial"}}>
            <Grid container style={{paddingRight:"200px"}}>
            <h1 style={{color:"red" ,fontSize:"50px"}}>{location.state.movie?.original_title}</h1>
            
                </Grid>
                <div style={{display:"flex",position:"fixed" ,marginTop:"-40px",marginLeft:"5px"}}>
                <p style={{color:"white"}}>Language: {location.state.movie?.original_language} - </p>
                <p style={{color:"white"}}> ReleaseDate: {location.state.movie?.release_date}</p>
                </div>
                
                <Grid container style={{paddingRight:"100px"}}>
                    
                
                <p style={{color:"white",fontweight:"100"}}>{location.state.movie?.overview}</p>
                {/* <Button variant='contained'sx={{color:"black", bgcolor:"white" ,position:"fixed",marginLeft:"5px",marginTop:"40px",fontWeight:"bold" }}>Play Trailer</Button> */}
                  <Trailer location={location}/>  
                    </Grid>           
                    </div>
        </div>
        </Grid>
        <Grid item xs={4}>
            <div style={{backgroundColor:"white" ,height:"100vh",padding:"20px"}}>
            <Grid container>
        <div >
            
            <h6 style={{color:"#A4A4A4",marginLeft:"10px"}}>ADD REVIEW</h6>
            <TextField onChange={(e)=>setreview(e.target.value)} style={{backgroundColor:"white",borderRadius:"5px"}} size='small' label="review" variant="outlined"/>
            <Button  onClick={addreview} sx={{ml:"10px",bgcolor:"red",color:"white"}} variant='contained'>submit</Button>
            
        </div>
        </Grid>
        <Grid container>
        <div>
            
        <h6 style={{color:"#A4A4A4"}}>REVIEW
        {reviewdata.map((eachdata)=>{
            return <>
            
            <div style={{display:"flex"}}>
            <img style={{width:"20px",borderRadius:"50px",}} src={eachdata.profile_image}/>
            <li style={{color:"grey",paddingLeft:"10px"}}>{eachdata.username}</li>
            </div>
            <h5 style={{color:"grey"}}>{eachdata.moviereview}</h5>
            </>


        })}

        </h6>
        
        </div>
        </Grid>
        </div>
        </Grid>
        
        </Grid>
  )
}

export default Moviedetail