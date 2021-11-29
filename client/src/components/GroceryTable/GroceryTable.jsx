import React from 'react'
import './GroceryTable.scss'

function GroceryTable() {
    return (
        <div className="grocery-table">
            <div className="grocery-table__subheaders">
                <p className="grocery-table__sub">CO2e</p>
                <p className="grocery-table__sub">Land use</p>
                <p className="grocery-table__sub">water use</p>
                <p className="grocery-table__sub">pollutants</p>
                <p className="grocery-table__sub">quantity</p>
            </div>
            <ul className="grocery-table__list">
                <li className="grocery-table__list-item">
                    <p className="grocery-table__grocery">Apple</p>
                    <div className="grocery-table__grocery-stats">
                        <p className="grocery-table__grocery-text">10kg</p>
                        <p className="grocery-table__grocery-text">10m2</p>
                        <p className="grocery-table__grocery-text">10l</p>
                        <p className="grocery-table__grocery-text">10g</p>
                    </div>
                    <input type="number" className="grocery-table__qty-input" placeholder="1"/>
                    <p>kg</p>
                    <button className="grocery-table__grocery-add">+</button>
                </li>
            </ul>
        </div>
    )
}

export default GroceryTable
