import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Chapters from './pages/Chapters'
import ReadContent from './pages/ReadContent'

const App = () => {

  
  return (
 <>
 <Routes>

<Route path='/' element={<Home/>}  />
<Route path='/novals/:id' element={<Chapters/>}/>
<Route path="/novels/:id/chapter/:chapter_id" element={<ReadContent />} />

 </Routes>
 
 </>
  )
}

export default App