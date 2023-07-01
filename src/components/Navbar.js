import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import lightModeIcon from "./../light_mode.svg"
import darkModeIcon from "./../dark_mode.svg"

export class Navbar extends Component {

  constructor(){
    super();

    this.state = {
      themeIcon: darkModeIcon
    }

  }

  toggleTheme = () => {

    let themeIconButton = document.getElementById("themeIconButton")
    themeIconButton.classList.remove("btn-light")
    themeIconButton.classList.remove("btn-dark")

    const changeTheme = (theme) => {
      document.documentElement.setAttribute("data-bs-theme",theme)
      theme==="light"?themeIconButton.classList.add("btn-light"):themeIconButton.classList.add("btn-dark");
    }
   
    if(localStorage.getItem("theme")==="light"||null){
      this.setState({themeIcon:lightModeIcon})
      localStorage.setItem("theme","dark")
      changeTheme("dark")
    }else{
      this.setState({themeIcon:darkModeIcon})
      localStorage.setItem("theme","light")
      changeTheme("light")
    }

  }

  componentDidMount(){
    this.toggleTheme()
  }



  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">

        <div className="container-fluid">
        <Link key="websiteName" style={{background: '-webkit-linear-gradient(0deg, rgb(216, 0, 255), rgb(0 255 255), red)',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent', fontWeight: "500"}} className="navbar-brand" to="/">NewsMonkey</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link className="nav-link" id='home' aria-current="page" to="/">Home</Link>
              </li>

              <li><Link className="nav-link" id='business' to="/business">Business</Link></li>
              <li><Link className="nav-link" id='entertainment' to="/entertainment">Entertainment</Link></li>
              <li><Link className="nav-link" id='health' to="/health">Health</Link></li>
              <li><Link className="nav-link" id='science' to="/science">Science</Link></li>
              <li><Link className="nav-link" id='sports' to="/sports">Sports</Link></li>
              <li><Link className="nav-link" id='technology' to="/technology">Technology</Link></li>

            </ul>

            {/* <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}

          <div className="d-flex align-items-center">
            <button id='themeIconButton' title="Enable Dark Mode" className="btn btn-light rounded-circle btn-light d-flex align-items-center justify-content-center"onClick={this.toggleTheme} style={{width:"40px", height:"40px"}}>
              <img id='themeIcon' src={this.state.themeIcon} data-theme="light" alt='' style={{width:"30px"}}/>
          </button>
          </div>

          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar