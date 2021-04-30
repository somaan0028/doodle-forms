import React, { Component } from 'react';
import {NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

class Navbar extends Component {

    componentDidMount(){
        const burgerIcon=document.querySelector("#burger");
        const items = document.querySelectorAll(".item");
        burgerIcon.addEventListener('click', () => {
            items.forEach((item,index)=>{
            item.classList.toggle("active")
            });
            burgerIcon.classList.toggle('mark')
        });
    }

    handleLogout = (e) => {
        e.preventDefault();
        axios({
			method: 'get',
			url: '/logout',
        })
        .then((response)=>{
            this.props.history.push("/");
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render(){
        // shows the appropriate buttons depending upon whether logged in or not 
        if (this.props.isAuth) {
            return (
                <nav>
                    <ul className="menu">
                        <li className="logo"><NavLink to="#"></NavLink></li>
                        <li className="item"><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li className="item"><a onClick={this.handleLogout} href="/logout">Log Out</a></li>
    
                        <li className="toggle"><span className="bars"></span></li>
                        <li className="toggle">
                            <div id="burger">
                                <div className="line1"></div>
                                <div className="line2"></div>
                                <div className="line3"></div>
                            </div>
                        </li>
                    </ul>
                </nav>
            );
        }else{
            return (
                <nav>
                    <ul className="menu">
                        <li className="logo"><NavLink to="#"></NavLink></li>
                        <li className="item"><NavLink to="/">Home</NavLink></li>
                        <li className="item"><NavLink to="/login">Log In</NavLink></li>
                        <li className="item"><NavLink to="/signup">Sign Up</NavLink></li>
    
                        <li className="toggle"><span className="bars"></span></li>
                        <li className="toggle">
                            <div id="burger">
                                <div className="line1"></div>
                                <div className="line2"></div>
                                <div className="line3"></div>
                            </div>
                        </li>
                    </ul>
                </nav>
            );
        }
    }
}

export default withRouter(Navbar)