import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Main from './pages/Main';
import Event from './pages/Event';
import Calendar from './pages/Calendar';
import Statistics from './pages/Statistics';

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/events/:id' element={<Event/>} />
          <Route path='/calendar' element={<Calendar/>} />
          <Route path='/statistics' element={<Statistics/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
