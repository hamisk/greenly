import { useState } from 'react';
import { v4 } from 'uuid';
import PaginationBar from '../PaginationBar/PaginationBar';
import SummaryItem from '../SummaryItem/SummaryItem'
import './SummaryTable.scss'

function SummaryTable({ summary, totals }) {

    const [pageIndex, setPageIndex] = useState(0);
    let pageSize = 10;
    let start = pageIndex * pageSize;
    let end = start + pageSize;
    let summaryToDisplay = summary.slice(start, end);
    
    const goToPage = (page) => {
        setPageIndex(page);
    }

    // console.log(summary)

    return (
        <div className="summary-table">
            <div className="summary-table__subheaders">
                <p className="summary-table__sub">CO2e</p>
                {/* <p className="summary-table__sub">Land use</p>
                <p className="summary-table__sub">water use</p>
                <p className="summary-table__sub">pollutants</p> */}
            </div>
            {!summary.length ? <p>Add an activity</p> :
            <div className="summary-table__summary-row">
                {summaryToDisplay.map(summary =>
                <SummaryItem summaryListItem={summary} key={v4()} />)}
            </div>}
            {!(summary.length > 10) ? "" :
            <PaginationBar 
                fullList={summary} 
                from="summary" 
                goToPage={goToPage}
                pageIndex={pageIndex}
                pageSize={pageSize}/>}
            <div className="summary-table__totals-wrapper">
                <p className="summary-table__totals-text">Total</p>
                <div className="summary-table__totals">
                    <p className="summary-table__totals-text">{totals[0].toFixed(1)} kg</p>                    
                    {/* <p className="summary-table__totals-text">{totals[1].toFixed(1)} m2</p>                    
                    <p className="summary-table__totals-text">{totals[2].toFixed(1)} l</p>                    
                    <p className="summary-table__totals-text">{totals[3].toFixed(1)} g</p>                     */}
                </div>
            </div>
        </div>
    )
}

export default SummaryTable
