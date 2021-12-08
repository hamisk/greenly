import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/icons/icons8-earth-100.png';
import { API_URL } from '../../config';
import './SideNav.scss'

export class SideNav extends Component {
    // routerProps passed through for active page styling

    state = {
        isAuthenticated: false,
        user: null
    };

    componentDidMount() {
        console.log(this.props)
        // Check auth
        let token = sessionStorage.getItem('authToken')
        if (!!token) {
            axios
                .get(`${API_URL}/auth/check-auth`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    this.setState({
                        isAuthenticated: true,
                        user: res.data,
                    });
                })
                .catch(() => {
                    this.setState({
                    isAuthenticated: false,
                    });
                });
            }
    }

    signOut = () => {
        // Change location to /logout server route while passing it
        // the URL for redirecting back to a client
        sessionStorage.removeItem('authToken')
        const url = `${window.location.protocol}//${window.location.host}`;
        window.location = `${API_URL}/auth/logout?from=${url}`;
    };

    render() {
        return (
            <div className="sidenav">
                <div className="sidenav__title-logo">
                    <img src={logo} alt="logo" className="sidenav__logo" />
                    <h2 className="sidenav__title">Greenly</h2>
                </div>
                <div className="sidenav__links-wrapper"> 
                    {this.state.isAuthenticated ? 
                    <>
                        <Link to='/profile'><p className="sidenav__link">hi {this.state.user.name}</p></Link>
                        <p onClick={this.signOut} className="sidenav__logout">logout</p>
                    </>
                    : <>
                        <Link to='/login'><p className="sidenav__link">login</p></Link>
                        <Link to='/signup'><p className="sidenav__link">signup</p></Link>
                    </>
                    }
                </div>
                <div className="sidenav__nav-links-wrapper">
                    <Link to='/'><div className="sidenav__link">home</div></Link>
                    <Link to='/home/profile'><div className="sidenav__link">profile</div></Link>
                    <Link to='/activities'><div className="sidenav__link">activities</div></Link>
                    <Link to='/about'><div className="sidenav__link">about</div></Link>
                </div>
            </div>
        )
    }
}

export default SideNav
