import React from 'react'

function UserActivityInfo() {
    return (
        <div>
            <div className="summary__header">
                        <p className="summary__title">Weekly Summary</p>
                        <p className="summary__date">Week Commencing: 11/29/2021</p>
                    </div>
                    <div className="summary__stats-wrapper">
                        <div className="summary__subheaders">
                            <p className="summary__sub">Goal</p>
                            <p className="summary__sub">Consumed</p>
                            <p className="summary__sub">Offset</p>
                            <p className="summary__sub">Remaining</p>
                        </div>

                        <div className="summary__stats-rows-section">
                        
                            <div className="summary__stat-row">
                                <div className="summary__stat-graphic">
                                    <img src={co2Icon} alt="co2 icon" className="summary__stat-icon" />
                                    <p className="summary__stat-name">CO2e (kg)</p>
                                </div>
                                <div className="summary__stat-numbers-row">
                                    <p className="summary__stat-text">100</p>
                                    <p className="summary__stat-text">150</p>
                                    <p className="summary__stat-text">75</p>
                                    <p className="summary__stat-text">20</p>
                                </div>
                            </div>
                            <div className="summary__stat-row">
                                <div className="summary__stat-graphic">
                                    <img src={landIcon} alt="land icon" className="summary__stat-icon" />
                                    <p className="summary__stat-name">Land use (m2)</p>
                                </div>
                                <div className="summary__stat-numbers-row">
                                    <p className="summary__stat-text">100</p>
                                    <p className="summary__stat-text">150</p>
                                    <p className="summary__stat-text">75</p>
                                    <p className="summary__stat-text">20</p>
                                </div>
                            </div>
                            <div className="summary__stat-row">
                                <div className="summary__stat-graphic">
                                    <img src={waterIcon} alt="water icon" className="summary__stat-icon" />
                                    <p className="summary__stat-name">water use (l)</p>
                                </div>
                                <div className="summary__stat-numbers-row">
                                    <p className="summary__stat-text">100</p>
                                    <p className="summary__stat-text">150</p>
                                    <p className="summary__stat-text">75</p>
                                    <p className="summary__stat-text">20</p>
                                </div>
                            </div>
                            <div className="summary__stat-row">
                                <div className="summary__stat-graphic">
                                    <img src={pollutionIcon} alt="pollution icon" className="summary__stat-icon" />
                                    <p className="summary__stat-name">pollutants (g)</p>
                                </div>
                                <div className="summary__stat-numbers-row">
                                    <p className="summary__stat-text">100</p>
                                    <p className="summary__stat-text">150</p>
                                    <p className="summary__stat-text">75</p>
                                    <p className="summary__stat-text">20</p>
                                </div>
                            </div>
                        </div>
                    </div>
            <h2>Welcome! {userActivities[0].id}</h2>
                    {userActivities.map( activity => 
                        <div key={v4()}>
                            <p>{activity.id}</p>
                            <p>{activity.user_id}</p>
                            <p>{activity.activity_id}</p>
                            <p>{activity.qty}</p>
                            <p>{activity.created_at}</p>
                            <p>{activity.activity}</p>
                            <p>{activity.category}</p>
                            <p>{activity.unit}</p>
                            <p>{activity.option}</p>
                            <p>{activity.carbon}</p>
                        </div>)}
        </div>
    )
}

export default UserActivityInfo
