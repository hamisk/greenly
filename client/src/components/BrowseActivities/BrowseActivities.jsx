import React, { Component } from 'react'
import ActivityTable from '../ActivityTable/ActivityTable'

export class BrowseActivities extends Component {

    render() {
        let { activities, categories, toggleCategoryClass, addActivityToSummary } = this.props
        return (
            <div className="activities">
                <h2>Add an activity</h2>
                {categories.map(mapCategory =>
                <div key={mapCategory[0]}>
                    <button className={`activities__collapsible ${mapCategory[1] ? "activities__active" : ""}`} 
                        onClick={() => {toggleCategoryClass(mapCategory)}}>
                        <h2>+ {mapCategory[0]}</h2>
                    </button>
                    <div className={mapCategory[1] ? "activities__content-expanded" : "activities__content-collapsed"}>
                        <ActivityTable activities={activities[mapCategory[0]]} addToSummary={addActivityToSummary}/>
                    </div>
                </div>)}
            </div>
        )
    }
}

export default BrowseActivities
