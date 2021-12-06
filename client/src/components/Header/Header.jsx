import { Link } from 'react-router-dom';
import './Header.scss'
import logo from '../../assets/icons/icons8-earth-100.png';
// import { useHistory } from "react-router";
import { Component } from 'react';
import { localAPI } from '../../utils/apiUtils';
import axios from 'axios';
// import LoginModal from '../LoginModal/LoginModal';

class Header extends Component {
    // routerProps passed through for active page styling
    // console.log(props)

    state = {
        isAuthenticated: false,
        user: null
    };

    componentDidMount() {
        // Check auth
        let token = sessionStorage.getItem('authToken')
        if (!!token) {
            axios
                .get(`${localAPI}auth/check-auth`, {
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
        window.location = `${localAPI}auth/logout?from=${url}`;
    };

    handleLogOut (e) {
        e.preventDefault();

        sessionStorage.removeItem('authToken')

        // history.push('/login')
    }

    render() {
        return (
            <>
                <div className="header">
                    <div className="header__title-logo">
                        <img src={logo} alt="logo" className="header__logo" />
                        <h2 className="header__title">Greenly</h2>
                    </div>
                    <div className="header__links-wrapper"> 
                        {this.state.isAuthenticated ? 
                        <><Link to='/profile'><p className="header__link">hi {this.state.user.name}</p></Link>
                        {/* <button onClick={this.signOut}>logout</button> */}
                        <p onClick={this.signOut} className="header__link">logout</p></> :
                        <>
                        <Link to='/signup'><p className="header__link">signup</p></Link>
                        <Link to='/login'><p className="header__link">login</p></Link>
                        </>
                        }
                    </div>
                    {/* <LoginModal name="name" id="id" handler={() => {}}/> */}
                </div>
                <div className="primary-nav">
                    <Link to='/'><div className="primary-nav__link">home</div></Link>
                    <Link to='/activities'><div className="primary-nav__link">activities</div></Link>
                    <Link to='/about'><div className="primary-nav__link">about</div></Link>
                </div>
            </>
        )
    }
}

export default Header;