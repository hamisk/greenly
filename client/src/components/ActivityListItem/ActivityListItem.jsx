import React, { useState } from 'react'
import { v4 } from 'uuid';
import './ActivityListItem.scss'

function ActivityListItem({ activity, addToSummary }) {

    const [qty, setQty] = useState(1);
    const [selectValue, setSelectValue] = useState(activity.option[0][0])
    const [optionId, setOptionId] = useState(activity.option[0][1]);
    // each option in activity array corresponds to a unique row in activities table in db
    // retain this to pass to user_logged_activities table

    function handleChange(event) {
        setSelectValue(event.target.value)
        setOptionId(activity.option[activity.option.findIndex(option => option[0] === event.target.value)][1])
    }

    function updateStats(event) {
        setQty(event.target.value)
    }

    return (
        <li className="activity-item__list-item">
            <p className="activity-item__activity">{activity.activity}</p>
            <select className="activity-item__select"
                value={selectValue} 
                onChange={handleChange}
            >
                {activity.option.map(option => 
                    <option value={option[0]} key={v4()}>{option[0]}</option>
                )}
            </select>
            
            <div className="activity-item__qty-wrapper">
                <input type="number" className="activity-item__qty-input" value={qty} onChange={updateStats}/>
                <p className="activity-item__activity-unit">{activity.unit}</p>
            </div>
            <p className="activity-item__activity-co2">
                {(qty * activity.carbon[activity.option.findIndex(option => option[0] === selectValue)]).toFixed(1)} kg
            </p>
            <button className="activity-item__activity-add" 
                onClick={() => {addToSummary(activity, qty, [selectValue, optionId])}}>
                +
            </button>
        </li>
    )
}

export default ActivityListItem;
