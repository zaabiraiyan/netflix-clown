import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import Youtube from "react-youtube"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Trailer = ({location}) => {
    const [trailerview,settrailerview]=useState([])
    const showtrailer=()=>{
        fetch(`https://api.themoviedb.org/3/movie/${location.state.movie.id}/videos?api_key=2492540b5eab59bc08dc04ab12c31084&language=en-US`)
        .then(res=>res.json())
        .then(json=>settrailerview(json.results))
    }
useEffect(()=>{
    showtrailer()
},[])

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    console.log(trailerview[0])

  return (
    <div>
    <Button onClick={openModal} variant='contained' sx={{color:"black ", bgcolor:"white"}}>Play Trailer</Button>
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
      <Youtube videoId={trailerview[0]?.key}/>
      
    </Modal>
  </div>
  )
}

export default Trailer