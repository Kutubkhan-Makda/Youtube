import React, { useEffect } from 'react'
import './LoginScreen.scss'
import logo from '../../Images/Youtube_logo.png'
import {FcGoogle} from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../../redux/actions/auth.action'
import { useNavigate } from 'react-router-dom'


const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const accessToken = useSelector(state=>state.auth.accessToken)

  const handleLogin = ()=>{
    dispatch(Login())
  }

  useEffect(()=>{
    if(accessToken){
      navigate('/Youtube')
    }
  },[accessToken,navigate])

  return (
    <div className="login">
        <div className="login_container">
            <img src={logo} alt="" />
            <button onClick={handleLogin}>
            <span><FcGoogle/></span>
            <span> Login with Google</span>
            </button>
            <p>This Project is made by Makda Kutubkhan</p>
        </div>
    </div>
  )
}

export default LoginScreen