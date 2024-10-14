import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Docter from './pages/Docter'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointment from './pages/MyAppointment'
import Appointments from './pages/Appointments'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Docter/>} />
        <Route path='/doctors/:speciality' element={<Docter/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/my-appointments' element={<MyAppointment/>} />
        <Route path='/appointment/:docId' element={<Appointments/>} />
      </Routes>
    </div>
  )
}

export default App