import React, { useState } from 'react'
import './GroceryListItem.scss'

function GroceryListItem({ grocery, addToSummary }) {

    const [qty, setQty] = useState(1);

    function updateStats(event) {
        setQty(event.target.value)
    }

    return (
        <li className="grocery-item__list-item">
            <p className="grocery-item__grocery">{grocery.food}</p>
            <div className="grocery-item__grocery-stats">
                <p className="grocery-item__grocery-text">{(qty * grocery.carbon).toFixed(1)} kg</p>
                <p className="grocery-item__grocery-text">{(qty * grocery.land).toFixed(1)} m²</p>
                <p className="grocery-item__grocery-text">{(qty * grocery.water).toFixed(1)} l</p>
                <p className="grocery-item__grocery-text">{(qty * grocery.pollutants).toFixed(1)} g</p>
            </div>
            <input type="number" className="grocery-item__qty-input" value={qty} onChange={updateStats}/>
            <p className="grocery-item__grocery-text">kg</p>
            <button className="grocery-item__grocery-add" onClick={() => {
                addToSummary(grocery, qty)
            }}>+</button>
        </li>
    )
}

export default GroceryListItem;
