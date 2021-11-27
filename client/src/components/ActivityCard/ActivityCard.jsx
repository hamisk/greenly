import React from 'react'
import icon from '../../assets/icons/icons8-earth-100-2.png';
import co2Icon from '../../assets/icons/icons8-co2-cloud-100.png';
import landIcon from '../../assets/icons/icons8-forest-100-2.png';
import waterIcon from '../../assets/icons/icons8-water-96.png';
import pollutionIcon from '../../assets/icons/icons8-forest-100.png';

import './ActivityCard.scss';

function ActivityCard(props) {
    const { activity } = props;
    return (
        <div className="activity-card">
            <h3 className="activity-card__title">{activity.food}</h3>
            <div className="activity-card__image-stats-wrapper">
                <div className="activity-card__image-div">
                    <img src={icon} alt="icon" className="activity-card__image"/>
                </div>
                <div className="activity-card__stats-wrapper">
                    <div className="activity-card__stat-graphic">
                        <img src={co2Icon} alt="co2 icon" className="activity-card__stat-icon" />
                        <p className="activity-card__stat-text">{activity.carbon.toFixed(1)} kg</p>
                    </div>
                    <div className="activity-card__stat-graphic">
                        <img src={landIcon} alt="land icon" className="activity-card__stat-icon" />
                        <p className="activity-card__stat-text">{activity.land.toFixed(1)} m²</p>
                    </div>
                    <div className="activity-card__stat-graphic">
                        <img src={waterIcon} alt="water icon" className="activity-card__stat-icon" />
                        <p className="activity-card__stat-text">{activity.water.toFixed(1)} l</p>
                    </div>
                    <div className="activity-card__stat-graphic">
                        <img src={pollutionIcon} alt="pollutant icon" className="activity-card__stat-icon" />
                        <p className="activity-card__stat-text">{activity.pollutants.toFixed(1)} g</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ActivityCard
