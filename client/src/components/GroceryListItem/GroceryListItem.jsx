import React from 'react'
import './GroceryListItem.scss'

function GroceryListItem() {
    return (
        <li className="grocery-item__list-item">
            <p className="grocery-item__grocery">Apple</p>
            <div className="grocery-item__grocery-stats">
                <p className="grocery-item__grocery-text">10kg</p>
                <p className="grocery-item__grocery-text">10m2</p>
                <p className="grocery-item__grocery-text">10l</p>
                <p className="grocery-item__grocery-text">10g</p>
            </div>
            <input type="number" className="grocery-item__qty-input" placeholder="1"/>
            <p className="grocery-item__grocery-text">kg</p>
            <button className="grocery-item__grocery-add">+</button>
        </li>
    )
}

export default GroceryListItem
