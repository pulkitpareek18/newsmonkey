import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import lightModeIcon from "./../light_mode.svg"
import darkModeIcon from "./../dark_mode.svg"

const Navbar = (props) => {
  const [themeIcon, setthemeIcon] = useState(lightModeIcon)
  
  const changeTheme = useCallback((theme) => {
    let themeIconButton = document.getElementById("themeIconButton")
    themeIconButton.classList.remove("btn-light")
    themeIconButton.classList.remove("btn-dark")
    document.documentElement.setAttribute("data-bs-theme", theme)
    theme === "light" ? themeIconButton.classList.add("btn-light") : themeIconButton.classList.add("btn-dark");
    if(theme === "light"){
      themeIconButton.classList.add("btn-light")
      setthemeIcon(darkModeIcon)
      themeIconButton.setAttribute("title","Enable Dark Mode")
    }else if(theme === "dark"){
      setthemeIcon(lightModeIcon)
      themeIconButton.setAttribute("title","Enable Light Mode")
    }
    // console.log("change theme")
  },[setthemeIcon])


  const toggleTheme = () => {
    if (localStorage.getItem("theme") === "light") {
      setthemeIcon(lightModeIcon)
      localStorage.setItem("theme", "dark")
      changeTheme("dark")
    } else {
      setthemeIcon(darkModeIcon)
      localStorage.setItem("theme", "light")
      changeTheme("light")
    }
    // console.log("toggle theme")
  }

  const setDefaultTheme = useCallback(() => {
    if(localStorage.getItem("theme")===null){
      changeTheme("light")
      return
    }
    changeTheme(localStorage.getItem('theme'))
  },[changeTheme])
 
  useEffect(() => {
    setDefaultTheme()
  }, [setDefaultTheme]);



    return (
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">

        <div className="container-fluid">
          <Link key="websiteName" style={{ background: '-webkit-linear-gradient(0deg, rgb(216, 0, 255), rgb(0 255 255), red)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: "500" }} className="navbar-brand" to="/">NewsMonkey</Link>
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
              <button id='themeIconButton' title="Enable Dark Mode" className="btn btn-light rounded-circle btn-light d-flex align-items-center justify-content-center" onClick={toggleTheme} style={{ width: "40px", height: "40px" }}>
                <img id='themeIcon' src={themeIcon} data-theme="light" alt='' style={{ width: "30px" }} />
              </button>
            </div>

          </div>
        </div>
      </nav>
    )
  }


export default Navbar