import React,{useEffect, useContext, useState} from 'react'
import {NavLink, Link} from 'react-router-dom'
import axios from 'axios'
import '../Style/navbar.css'
import SignupImg from '../Image/blog-pic.png';
import Cookies from 'universal-cookie';

const Navbar = (props) => {
    console.log(props)
    const cookies = new Cookies();
    const logout = () =>{
        localStorage.removeItem("accessToken")
        window.location.redirect='/signin';
    }
    const [email, setEmail] = useState("");
    useEffect(()=>{
        axios.get(`http://localhost:3001/user/userdata`,{
            headers:{
              "accessToken":localStorage.getItem("accessToken")
            }
        })
        .then((res) => {
            var email = res.data.email;
            var name = email.match(/^([^@]*)@/)[1];
            setEmail(name)
        })
    },[])

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'><img src={SignupImg} className="navimage"/></Link>
                <button className="navbar-toggler text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon">   
    <i class="fas fa-bars" style={{color:'black', fontSize:`${28}px`}}></i>
                                </span>             
                                                        </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        {/* <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}
                        <li className="nav-item">
                            <NavLink exact className="nav-link" to='/'>Go to Blogs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact className="nav-link" to='/createblog/'>Create Blog</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/signin' onClick={logout}>Logout</NavLink>
                        </li>

                    </ul>
                    <ul className="navbar-nav ml-auto mr-3">
                    <li><h5><i class="fas fa-user"></i> {email}</h5></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;