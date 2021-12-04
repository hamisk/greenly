import React, { useState } from 'react'
import ActivityListItem from '../ActivityListItem/ActivityListItem'
import PaginationBar from '../PaginationBar/PaginationBar';
import './ActivityTable.scss'

function ActivityTable({ activities, addToSummary }) {

    const [pageIndex, setPageIndex] = useState(0);
    let pageSize = 5;
    let start = pageIndex * pageSize;    
    let end = start + pageSize;
    let activitiesToDisplay = (activities.slice(start, end))

    // console.log(activitiesToDisplay)

    const goToPage = (page) => {
        setPageIndex(page);
    }

    return (
        <div className="activity-table">
            <div className="activity-table__subheaders">
                <p className="activity-table__sub">Activity</p>
                {/* <p className="activity-table__sub">Land use</p> */}
                {/* <p className="activity-table__sub">water use</p> */}
                {/* <p className="activity-table__sub">pollutants</p> */}
                {/* <p className="activity-table__sub">quantity</p> */}
            </div>
            <ul className="activity-table__list">
                {activitiesToDisplay.map(activity =>
                <ActivityListItem activity={activity} addToSummary={addToSummary} key={activity.id}/>)}
            </ul>
            {!(activities.length > pageSize) ? "" :
            <PaginationBar 
                fullList={activities} 
                from="Activity" 
                goToPage={goToPage}
                pageIndex={pageIndex}
                pageSize={pageSize}/>}
        </div>
    )
}

export default ActivityTable
