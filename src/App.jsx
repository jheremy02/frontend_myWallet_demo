import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'flowbite';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import Users from './views/Users';
import Categories from './views/Categories';
import Accounts from './views/Accounts';
import Operations from './views/Operations';
import "react-toastify/dist/ReactToastify.css";
import Register from './views/Register';
import Login from './views/Login';
import RequireAuth from './components/auth/RequireAuth';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Configs from './views/Configs';

function App() {

  return (
    <>
      <Routes  >
        <Route  path='/users' element={<RequireAuth><Layout></Layout></RequireAuth>} >
          <Route index element={<ProtectedRoute><Users></Users></ProtectedRoute>}></Route>
        </Route>
        <Route path='/categories' element={<RequireAuth><Layout></Layout></RequireAuth>} >
          <Route index element={<Categories></Categories>} ></Route>
        </Route>
        <Route path='/accounts' element={<RequireAuth><Layout></Layout></RequireAuth>} >
          <Route index element={<Accounts></Accounts>} ></Route>
        </Route>
        <Route path='/operations' element={<RequireAuth><Layout></Layout></RequireAuth>} >
          <Route index element={<Operations></Operations>} ></Route>
        </Route>
        <Route path='/configs' element={<RequireAuth><Layout></Layout></RequireAuth>} >
          <Route index element={<Configs></Configs>} ></Route>
        </Route>
        <Route path='/dashboard' element={<RequireAuth><Layout></Layout></RequireAuth>}>
        <Route index element={<Dashboard></Dashboard>} ></Route>
        </Route>
        <Route path="/" element={<Navigate to="users"/>}/>
        <Route path="/register" element={<Register></Register>}/>
        <Route path="/login" element={<Login></Login>}/>
      </Routes>
    </>
  )
  
}

export default App
