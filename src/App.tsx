import React from 'react'
import Home from './pages/Home'
import Header from './shared/layout/Header'
import CategoriesBar from './shared/layout/CategoriesBar'
import Footer from './shared/layout/Footer'

const App: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className="sticky top-0 z-50">
        <Header />
        <CategoriesBar />
      </div>




      <Home />
      <Footer />


    </div>

  )
}

export default App
