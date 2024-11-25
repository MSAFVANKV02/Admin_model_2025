import { useState } from 'react'
import { Outlet } from "react-router-dom";

import './App.css'
import Navbar from './components/navbar_/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="">
        <Navbar/>
        <main className='section_container'>
          <Outlet />
        </main>
      
      </div>
    </>
  )
}

export default App
