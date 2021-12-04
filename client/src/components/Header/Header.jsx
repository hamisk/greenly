import { Link } from 'react-router-dom';
import './Header.scss'
import logo from '../../assets/icons/icons8-earth-100.png';

function Header(props) {
    // routerProps passed through for active page styling
    console.log(props)
    return (
        <>
            <div className="header">
                <div className="header__title-logo">
                    <img src={logo} alt="logo" className="header__logo" />
                    <h2 className="header__title">Greenly</h2>
                </div>
                <div className="header__links-wrapper">
                    <Link to='/profile'><p className="header__link">hi user</p></Link>
                    <Link to='/login'><p className="header__link">login</p></Link>
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