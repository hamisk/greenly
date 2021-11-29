import React from 'react'
import GroceryListItem from '../GroceryListItem/GroceryListItem'
import PaginationBar from '../PaginationBar/PaginationBar';
import './GroceryTable.scss'

function GroceryTable({ groceries, addToSummary }) {

    let start = 0;
    let end = start + 5;
    let groceriesToDisplay = groceries.slice(start, end);

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
                {groceriesToDisplay.map(grocery =>
                <GroceryListItem grocery={grocery} addToSummary={addToSummary} key={grocery.id}/>)}
            </ul>
            <PaginationBar />
        </div>
    )
}

export default GroceryTable
