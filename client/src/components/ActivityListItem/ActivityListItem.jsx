import React, { useState } from 'react'
import './ActivityListItem.scss'

function ActivityListItem({ activity, addToSummary }) {

    console.log(activity)

    const [qty, setQty] = useState(1);
    const [selectValue, setSelectValue] = useState(activity.option[0])

    function handleChange(event) {
        setSelectValue(event.target.value)
        console.log(selectValue)
        // this.setState({selectValue:e.target.value});
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
                    <option value={option}>{option}</option>
                )}
            </select>
            
            <div className="activity-item__qty-wrapper">
                <input type="number" className="activity-item__qty-input" value={qty} onChange={updateStats}/>
                <p className="activity-item__activity-unit">{activity.unit}</p>
            </div>
            <p className="activity-item__activity-text">
                {(qty * activity.carbon[activity.option.findIndex(option => option === selectValue)]).toFixed(1)} kg</p>
            <button className="activity-item__activity-add" onClick={() => {
                addToSummary(activity, qty)
            }}>+</button>
        </li>
    )
}

export default ActivityListItem;
