import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  pageSize = 15
  render() {
    return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route element={<News key="general" elementId="home"  categoryName="" pageSize={this.pageSize} country="in" category="general" />} exact path="/" />
          <Route element={<News key="business" elementId="business" categoryName="Business" pageSize={this.pageSize} country="in" category="business" />} exact path="/business" />
          <Route element={<News key="entertainment" elementId="entertainment" categoryName="Entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} exact path="/entertainment" />
          <Route element={<News key="health" elementId="health" categoryName="Health" pageSize={this.pageSize} country="in" category="health" />} exact path="/health" />
          <Route element={<News key="science" elementId="science" categoryName="Science" pageSize={this.pageSize} country="in" category="science" />} exact path="/science" />
          <Route element={<News key="sports" elementId="sports" categoryName="Sports" pageSize={this.pageSize} country="in" category="sports" />} exact path="/sports" />
          <Route element={<News key="technology" elementId="technology" categoryName="Technology" pageSize={this.pageSize} country="in" category="technology" />} exact path="/technology" />
        </Routes>
    </BrowserRouter>)
  }
}


