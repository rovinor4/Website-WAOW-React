import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './Pages/login.jsx'
import Register from './Pages/register.jsx'
import Pll from './Pages/main.jsx'
import { ConfigProvider, theme } from 'antd'
import Profile from './Pages/Profile.jsx'
import Page404 from './Pages/Page404.jsx'
import Category from './Pages/category.jsx'

createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={{ token: { colorPrimary: "#373660" } }}>
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Pll />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/category' element={<Category />} />
          <Route path='/category/:uuid' element={<Category />} />
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ConfigProvider>,
)
