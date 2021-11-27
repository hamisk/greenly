import { Link } from 'react-router-dom';
import './Header.scss'

function Header() {
    return (
        <div className="primary-nav">
            <Link to='/compare'><div className="primary-nav__link">compare</div></Link>
            <Link to='/activities'><div className="primary-nav__link">activities</div></Link>
            <Link to='/login'><div className="primary-nav__link">login</div></Link>
            <Link to='/about'><div className="primary-nav__link">about</div></Link>
        </div>
    )
}

export default Header;