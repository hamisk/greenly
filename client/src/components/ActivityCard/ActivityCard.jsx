import React from 'react'
import icon from '../../assets/icons/icons8-earth-100-2.png';
import co2Icon from '../../assets/icons/icons8-co2-cloud-100.png';
import landIcon from '../../assets/icons/icons8-land-64.png';
import waterIcon from '../../assets/icons/icons8-water-96.png';
import pollutionIcon from '../../assets/icons/icons8-water-pollution-64.png';

import './ActivityCard.scss';

function ActivityCard(props) {
    return (
        <div className="activity-card">
            <h3 className="activity-card__title">Apple</h3>
            <img src={icon} alt="icon" className="activity-card__image"/>
            <div className="activity-card__stats-wrapper">
                <div className="activity-card__stat-graphic">
                    <img src={co2Icon} alt="stat icon" className="activity-card__stat-icon" />
                    <p className="activity-card__stat-text">0.43 kg</p>
                </div>
                <div className="activity-card__stat-graphic">
                    <img src={landIcon} alt="stat icon" className="activity-card__stat-icon" />
                    <p className="activity-card__stat-text">0.43</p>
                </div>
                <div className="activity-card__stat-graphic">
                    <img src={waterIcon} alt="stat icon" className="activity-card__stat-icon" />
                    <p className="activity-card__stat-text">0.43</p>
                </div>
                <div className="activity-card__stat-graphic">
                    <img src={pollutionIcon} alt="stat icon" className="activity-card__stat-icon" />
                    <p className="activity-card__stat-text">0.43</p>
                </div>
            </div>
            
        </div>
    )
}

export default ActivityCard
