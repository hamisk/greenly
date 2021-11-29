import React from 'react'
import './GroceryListItem.scss'

function GroceryListItem({ grocery, addToSummary }) {
    // console.log(grocery)
    return (
        <li className="grocery-item__list-item">
            <p className="grocery-item__grocery">{grocery.food}</p>
            <div className="grocery-item__grocery-stats">
                <p className="grocery-item__grocery-text">{grocery.carbon.toFixed(1)} kg</p>
                <p className="grocery-item__grocery-text">{grocery.land.toFixed(1)} m²</p>
                <p className="grocery-item__grocery-text">{grocery.water.toFixed(1)} l</p>
                <p className="grocery-item__grocery-text">{grocery.pollutants.toFixed(1)} g</p>
            </div>
            <input type="number" className="grocery-item__qty-input" placeholder="1"/>
            <p className="grocery-item__grocery-text">kg</p>
            <button className="grocery-item__grocery-add" onClick={() => {
                addToSummary(grocery)
            }}>+</button>
        </li>
    )
}

export default GroceryListItem;
