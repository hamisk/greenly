import React, { useState } from 'react'
import GroceryListItem from '../GroceryListItem/GroceryListItem'
import PaginationBar from '../PaginationBar/PaginationBar';
import './GroceryTable.scss'

function GroceryTable({ groceries, addToSummary }) {

    const [pageIndex, setPageIndex] = useState(0);
    let pageSize = 5;
    let start = pageIndex * pageSize;    
    let end = start + pageSize;
    let grocToDisplay = (groceries.slice(start, end))

    const goToPage = (page) => {
        setPageIndex(page);
    }

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
                {grocToDisplay.map(grocery =>
                <GroceryListItem grocery={grocery} addToSummary={addToSummary} key={grocery.id}/>)}
            </ul>
            <PaginationBar 
                fullList={groceries} 
                from="grocery" 
                goToPage={goToPage}
                pageIndex={pageIndex}
                pageSize={pageSize}/>
        </div>
    )
}

export default GroceryTable
