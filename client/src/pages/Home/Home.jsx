import React, { Component } from 'react'
import SubNav from '../../components/SubNav/SubNav';
import './Home.scss';
import co2Icon from '../../assets/icons/icons8-co2-cloud-100.png';
import landIcon from '../../assets/icons/icons8-forest-100-2.png';
import waterIcon from '../../assets/icons/icons8-water-96.png';
import pollutionIcon from '../../assets/icons/icons8-forest-100.png';

export class Home extends Component {
    render() {
        const tabs = ['dashboard', 'profile']
        return (
            <div>
                <SubNav tabs={tabs}/>
                <div className="summary">
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

                    <div className="summary__buttons">
                        <button className="summary__add-activity">+ add activity</button>
                        <button className="summary__add-offset">+ add offset</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
