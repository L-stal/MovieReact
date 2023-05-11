import { useState } from 'react';
import Navbar from './Navbar';
import Movies from './components/Movies.jsx';
import PersonList from './components/PersonList.jsx';
import PersonGList from './components/PersonGList.jsx';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


function App() {
    return (
      <div>
          <BrowserRouter>
        <header> 
          <Navbar />
          </header>
          <main>
            <Routes>
              <Route path='/' element={<PersonList />}/>
              <Route path='PersonGList/:firstName' element={<PersonGList />}/>
              <Route path='Movies' element={<Movies />}/>
            </Routes>
          </main>
    </BrowserRouter>
   </div>
  );
}

export default App
