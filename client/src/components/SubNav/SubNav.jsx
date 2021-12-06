import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import './SubNav.scss';

export default function SubNav({ page, tabs }) {
    return (
        <div className="sub-nav">
            {tabs.map(tab => 
                <Link to={`${page}/${tab}`} key={v4()}><div className="sub-nav__link">{tab}</div></Link>
            )}
        </div>
    )
}
