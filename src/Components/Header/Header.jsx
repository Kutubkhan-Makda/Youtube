import React from 'react'
import './Header.scss'
import { FaBars } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps } from 'react-icons/md'
import logo from '../../Images/Youtube_logo.png'
import avtar from '../../Images/Avtar.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({handleToggleSidebar}) => {
  const [input,setInput] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e)=>{
    e.preventDefault()
    navigate(`/search/${input}`)
  }

  return (
    <div className='border border-dark header'>
      <FaBars className='header_menu' size={26} onClick={()=>handleToggleSidebar()}/>
      <img src={logo} alt="logo" className="header_logo" />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Search' value={input} onChange={e=>setInput(e.target.value)}/>
        <button type='submit'><AiOutlineSearch size={22}/></button>
      </form>
      <div className="header_icon">
        <MdNotifications size={28}/>
        <MdApps size={28}/>
        <img src={avtar} alt="avtar" />
      </div>
    </div>
  )
}

export default Header