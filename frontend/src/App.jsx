import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import CreateProductPage from './pages/CreatePage.jsx'
import EditProductPage from './pages/EditPage.jsx'
import AuthPages from './hooks/AuthPages.jsx'

const App = () => {
  return (
    <div className='min-h-screen bg-base-100'>
      <Navbar />

      <main className='mx-w-5xl mx-auto px-4 py8' >
        <Routes>
          <Route path='/' element={<HomePage />} ></Route>
          <Route path='/product/:id' element={< ProductPage />} ></Route>
          <Route path='/profile' element={< ProfilePage />} ></Route>
          <Route path='/create' element={<CreateProductPage />} ></Route>
          <Route path='/edit/:id' element={<EditProductPage />} ></Route>
          <Route path='/login' element={<AuthPages />} ></Route>
          <Route path='/register' element={<AuthPages />} ></Route>


        </Routes>
      </main>

    </div>
  )
}

export default App