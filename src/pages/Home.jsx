import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Home = () => {


  const[data,setData] = useState([]);
   

useEffect(() => {
  
  const getnovels= async()=>{
    try {

        const values = await axios.get('https://novels1.pythonanywhere.com/api/novels/')
       setData(values.data)
       
    
    
    } catch (error) {
        
    }


}
getnovels()

  
}, [])



   
  return (
    <>
    <>
  {/* Image and text */}
  <nav className="navbar navbar-light bg-light">
    <a className="navbar-brand" href="#">
      <img
        src="https://cdn.vectorstock.com/i/750p/23/77/book-icon-logo-vector-2982377.avif"
        width={30}
        height={30}
        className="d-inline-block align-top"
        alt=""
      />
      Novels
    </a>
  </nav>
</>

    
    <div className="list-group mt-3" >
      { data.map((data,index)=>(
      
        <Link to={`/novals/${data.id}`} key={index} href="#" className="list-group-item mb-2 list-group-item-action ">
        {index+1}. {data.name} 
      </Link>))
     }
      
    </div>

    </>
    
        
 
    
   
  )
}

export default Home