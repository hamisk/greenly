import React, { Component } from 'react'
import ActivityTable from '../ActivityTable/ActivityTable'
import { v4 } from 'uuid';
import './BrowseActivities.scss';

export class BrowseActivities extends Component {

    render() {
        let { activities, categories, toggleCategoryClass, addActivityToSummary } = this.props
        return (
            <div className="activities">
                <h2>Add an activity</h2>
                {categories.map(mapCategory =>
                <div key={v4()}>
                    <div className={mapCategory[1] ? "activities__content-expanded" : "activities__content-collapsed"}>
                        <ActivityTable activities={activities[mapCategory[0]]} addToSummary={addActivityToSummary}/>
                    </div>
                </div>)}
                <div className="activities__categories-wrapper">
                    {categories.map((mapCategory, index) =>
                    <button key={mapCategory[0]} 
                        className={`activities__category ${mapCategory[1] ? "activities__active" : ""}`} 
                        onClick={() => {toggleCategoryClass(mapCategory)}}
                        style={{animationDelay: `${0.07*index}s`}}>
                        <p>+ {mapCategory[0]}</p>
                    </button>)}
                </div>
                
            </div>
        )
    }
}

export default BrowseActivities
