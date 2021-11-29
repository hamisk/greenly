import React from 'react'
import './SummaryTable.scss'

function SummaryTable() {
    return (
        <div>
            <div className="table__subheaders">
                <p className="table__sub">CO2e</p>
                <p className="table__sub">Land use</p>
                <p className="table__sub">water use</p>
                <p className="table__sub">pollutants</p>
            </div>

            <div className="table__totals-wrapper">
                <p className="table__totals-text">Total</p>
                <div className="table__totals">
                    <p className="table__totals-text">100 kg</p>                    
                    <p className="table__totals-text">100 m2</p>                    
                    <p className="table__totals-text">100 l</p>                    
                    <p className="table__totals-text">100 g</p>                    
                </div>
            </div>
            
        </div>
    )
}

export default SummaryTable
