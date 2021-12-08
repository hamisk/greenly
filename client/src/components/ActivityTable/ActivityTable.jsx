import React, { useState } from 'react'
import ActivityListItem from '../ActivityListItem/ActivityListItem'
import PaginationBar from '../PaginationBar/PaginationBar';
import './ActivityTable.scss'

function ActivityTable({ activities, addToSummary }) {
    
    if (!!activities) {
        activities.sort((a,b) => (a.activity > b.activity) ? 1 : ((b.activity > a.activity) ? -1 : 0))
        activities.sort((a,b) => (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0))
        console.log(activities)
    }

    return (
        <div className="activity-table">
            <div className="activity-table__subheaders">
                <p className="activity-table__sub-activity">Activity</p>
                <p className="activity-table__sub-option">Options</p>
                <p className="activity-table__sub-qty">Quantity</p>
                <p className="activity-table__sub-co2">CO2e</p>
            </div>
            {!!activities ? 
            <div className="activity-table__list-wrapper">
                <ul className="activity-table__list">
                    {activities.map(activity =>
                    <ActivityListItem activity={activity} addToSummary={addToSummary} key={activity.id}/>)}
                </ul>
            </div>
            : <p className="activity-table__loading">please select a category</p>}
        </div>
    )
}

export default ActivityTable
