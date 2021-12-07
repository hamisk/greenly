import React, { Component } from 'react'
import ActivityTable from '../ActivityTable/ActivityTable'

export class SearchActivities extends Component {

    render() {
        let { activities, addActivityToSummary } = this.props
        // category object also available in props
        activities.sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0))
        return (
            <div className="activities">
                <h2>Search for an activity</h2>
            
                <ActivityTable activities={activities} addToSummary={addActivityToSummary} perPage={10}/>
            </div>
        )
    }
}

export default SearchActivities
