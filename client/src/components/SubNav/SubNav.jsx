import React from 'react'
import { Link } from 'react-router-dom';
import './SubNav.scss';

export default function SubNav() {
    return (
        <div className="sub-nav">
            <Link to='/'><div className="sub-nav__link">summary</div></Link>
            <Link to='/activities'><div className="sub-nav__link">goals</div></Link>
            <Link to='/offset'><div className="sub-nav__link">profile</div></Link>
            {/* <Link to='/about'><div className="sub-nav__link">about</div></Link> */}
        </div>
    )
}
