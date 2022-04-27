import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/icons/icons8-earth-100.png';
import menu from '../../assets/icons/menu.png';
import { API_URL } from '../../config';
import './SideNav.scss'

export class SideNav extends Component {
    // routerProps passed through for active page styling

    state = {
        isAuthenticated: false,
        user: null,
        sideNavToggle: false
    };

    componentDidMount() {
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

    toggleSideNav= () => {
        let currentToggle = this.state.sideNavToggle
        this.setState({
            sideNavToggle: !currentToggle
        })
    }

    render() {
        const pathName = this.props.location.pathname
        return (
            <>
            <div className='side-toggle'>
                <div className="side-toggle__title-logo">
                    <img src={logo} alt="logo" className="side-toggle__logo" />
                    <h2 className="side-toggle__title">Greenly</h2>
                </div>
                <img src={menu} alt='menu icon' className={!this.state.sideNavToggle ? 'side-toggle__icon' : 'side-toggle__icon--active'} onClick={this.toggleSideNav}/>
            </div>
            <div className={this.state.sideNavToggle ? "sidenav" : "sidenav__hide"}>
                <div className="sidenav__title-logo">
                    <img src={logo} alt="logo" className="sidenav__logo" />
                    <h2 className="sidenav__title">Greenly</h2>
                </div>
                <div className="sidenav__links-wrapper"> 
                    {this.state.isAuthenticated ? 
                    <>
                        <Link to='/home/profile' onClick={() => {this.setState({sideNavToggle: false})}}><p className="sidenav__link">hi {this.state.user.name}</p></Link>
                        <p onClick={this.signOut} className="sidenav__logout">logout</p>
                    </>
                    : <>
                        <Link to='/login' onClick={() => {this.setState({sideNavToggle: false})}}><p className="sidenav__link">login</p></Link>
                        <Link to='/signup' onClick={() => {this.setState({sideNavToggle: false})}}><p className="sidenav__link">signup</p></Link>
                    </>
                    }
                </div>
                <div className="sidenav__nav-links-wrapper">
                    <Link to='/' onClick={() => {this.setState({sideNavToggle: false})}}><div className={pathName === "/" ? "sidenav__link--active" : "sidenav__link"}>home</div></Link>
                    <Link to='/home/profile' onClick={() => {this.setState({sideNavToggle: false})}}><div className={pathName === "/home/profile" ? "sidenav__link--active" : "sidenav__link"}>profile</div></Link>
                    <Link to='/activities' onClick={() => {this.setState({sideNavToggle: false})}}><div className={pathName === "/activities" ? "sidenav__link--active" : "sidenav__link"}>activities</div></Link>
                    <Link to='/new-activity' onClick={() => {this.setState({sideNavToggle: false})}}><div className={pathName === "/new-activity" ? "sidenav__link--active" : "sidenav__link"}>add new activity</div></Link>
                    <Link to='/about' onClick={() => {this.setState({sideNavToggle: false})}}><div className={pathName === "/about" ? "sidenav__link--active" : "sidenav__link"}>about</div></Link>
                </div>
            </div>
            </>
        )
    }
}

export default SideNav
