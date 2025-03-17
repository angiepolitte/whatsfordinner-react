import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import RestaurantSearch from './components/RestaurantSearch'
import RestaurantResults from "./components/RestaurantResults";
import RandomRestaurant from './components/RandomRestaurant'

function App() {
  const [count, setCount] = useState(0)
  return (
  <>
  <Router>
  <Routes>
    {/* <Route path="/" element={<NurserySearch />} />
    <Route path="/results" element={<Results />} /> */}
    <Route path="/" element={<RestaurantSearch />} />
    <Route path="/restaurant-results" element={<RestaurantResults />} />
    <Route path="/random-restaurant" element={<RandomRestaurant />} />
  </Routes>
</Router>
 
</>
  )
}

export default App

// import React from 'react';
// import { useState } from 'react'
// import './App.css'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
// import RestaurantSearch from './components/RestaurantSearch'
// import RestaurantResults from "./components/RestaurantResults";
// import RandomRestaurant from './components/RandomRestaurant'
// import StarterPage from './components/StarterPage';
// import ThemeSignInPage from './components/SignIn';
// import { SignUpPage } from './components/SignUp';
// import SuccessPage from './components/SuccessPage';
// import NotFound from './components/NotFound';

// function App() {
//   const [count, setCount] = useState(0)
//   return (
//   <>
//   <Router>
//   <Routes>
//     <Route path="/" element={<StarterPage />} />
//     {/* <Route path="/signin" element={<ThemeSignInPage />} />
//     <Route path="/signup" element={<SignUpPage />} />
//     <Route path="/success" element={<SuccessPage />} /> */}
//     <Route path="/restaurant-search" element={<RestaurantSearch />} />
//     <Route path="/restaurant-results" element={<RestaurantResults />} />
//     <Route path="/random-restaurant" element={<RandomRestaurant />} />
//     <Route path="*" element={<NotFound />} />
//   </Routes>
// </Router>
 
// </>
//   )
// }

// export default App
