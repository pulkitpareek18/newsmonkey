import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<News key="general" categoryName="" pageSize={15} country="in" category="general" />} exact path="/" />
        <Route element={<News key="business" categoryName="Business" pageSize={15} country="in" category="business" />} exact path="/business" />
        <Route element={<News key="entertainment" categoryName="Entertainment" pageSize={15} country="in" category="entertainment" />} exact path="/entertainment" />
        <Route element={<News key="health" categoryName="Health" pageSize={15} country="in" category="health" />} exact path="/health" />
        <Route element={<News key="science" categoryName="Science" pageSize={15} country="in" category="science" />} exact path="/science" />
        <Route element={<News key="sports"   categoryName="Sports" pageSize={15} country="in" category="sports" />} exact path="/sports" />
        <Route element={<News key="technology" categoryName="Technology" pageSize={15} country="in" category="technology" />} exact path="/technology" />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;