import { Link } from 'react-router-dom';
import './Header.scss'
import logo from '../../assets/icons/icons8-earth-100.png';
import { useHistory } from "react-router";

function Header(props) {
    // routerProps passed through for active page styling
    // console.log(props)
    const history = useHistory();

    function handleLogOut (e) {
        e.preventDefault();

        sessionStorage.removeItem('authToken')

        history.push('/login')
    }

    return (
        <>
            <div className="header">
                <div className="header__title-logo">
                    <img src={logo} alt="logo" className="header__logo" />
                    <h2 className="header__title">Greenly</h2>
                </div>
                <div className="header__links-wrapper">
                    
                    {!props.isLoggedIn ? 
                    <Link to='/login'><p className="header__link">login</p></Link> :
                    <><Link to='/profile'><p className="header__link">hi {props.userInfo.username}</p></Link>
                    <p onClick={handleLogOut} className="header__link">logout</p></>}
                </div>
            </div>
            <div className="primary-nav">
                <Link to='/'><div className="primary-nav__link">home</div></Link>
                <Link to='/activities'><div className="primary-nav__link">activities</div></Link>
                <Link to='/about'><div className="primary-nav__link">about</div></Link>
            </div>
        </>
    )
}

export default Header;