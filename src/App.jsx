import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.scss'
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import HomeScreen from './Screen/HomeScreen/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginScreen from './Screen/LoginScreen/LoginScreen';
import { useSelector } from 'react-redux';
import WatchScreen from './Screen/WatchScreen/WatchScreen';
import SearchScreen from './Screen/SearchScreen/SearchScreen';
import SubscriptionScreen from './Screen/SubscriptionScreen/SubscriptionScreen';
import ChannelScreen from './Screen/ChannelScreen/ChannelScreen';

export const Layout = ({children})=>{
  const [sidebar,toggleSidebar] = useState(false);

  const handleToggleSidebar = ()=>toggleSidebar(value=>!value)

  return(
    <>
    <Header handleToggleSidebar={handleToggleSidebar}/>
    <div className="app_container">
      <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar}/>
      <Container fluid className="app_main">
        {children}
      </Container>
    </div>
    </>
  );
}

const App = () => {
  const {accessToken,loading} = useSelector(state=>state.auth)

  useEffect(()=>{
    if(!loading && !accessToken){
      
    }
  },[accessToken,loading])

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/Youtube' exact element={
          <>
          <Layout>
            <HomeScreen/>
          </Layout>
          </>
        }></Route>
        <Route path='/login' element={<LoginScreen/>}></Route>
        <Route path='/search/:query' element={
          <>
          <Layout>
            <SearchScreen/>
          </Layout>
          </>
        }></Route>
        <Route path='/watch/:id' element={
          <>
          <Layout>
            <WatchScreen/>
          </Layout>
          </>
        }></Route>
        <Route path='/feed/subscriptions' element={
          <>
          <Layout>
            <SubscriptionScreen/>
          </Layout>
          </>
        }></Route>
        <Route path='/channel/:channelId' element={
          <>
          <Layout>
            <ChannelScreen/>
          </Layout>
          </>
        }></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App