import React from 'react'
import { Link } from 'react-router-dom';
import './SubNav.scss';

export default function SubNav({ tabs }) {
    return (
        <div className="sub-nav">
            {tabs.map(tab => 
                <Link to={`/${tab}`}><div className="sub-nav__link">{tab}</div></Link>
            )}
        </div>
    )
}
