import React, { useEffect, useState } from 'react'
import {Box, Card, CardMedia, Grid} from "@mui/material"
import { Link } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { database } from '../firebase/setup'


const Home = () => {
    const [movies,setmovies]=useState([])

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
    console.log(movies)
const addmovie=async(movie)=>{
    const movieref = doc(database,"Movies",`${movie.id}`)
    try{
        await setDoc(movieref,{
            moviename:movie.original_title
        })
    }catch(err){
        console.error(err)
    }
}    


  return (
    <div style={{backgroundColor:"#181818"}}>
        <Grid container spacing={2}>
        {movies.map(movie=>{
            {addmovie(movie)}
            
            return <Grid item xs={3} style={{paddingTop:"20px",paddingRight:"20px",paddingleft:"20px"}}>  
            <Box>
            <Link to="/moviedetail" state={{movie:movie}}>   
            <Card>
                
                    <CardMedia
                    component="img"
                    height="140"
                    image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    >

                    </CardMedia>
                
            </Card>
            </Link> 
        </Box>

        </Grid>
        })}
        </Grid>
       



    </div>
  )
}

export default Home