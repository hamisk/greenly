import SummaryListItem from '../SummaryListItem/SummaryListItem';
import { v4 } from 'uuid';
import './SummaryTable.scss'

function SummaryTable({ summary, totals }) {

    return (
        <div className="summary-table">
            <div className="summary-table__subheaders">
                <p className="summary-table__sub-activity">Activity</p>
                <p className="summary-table__sub-option">Options</p>
                <p className="summary-table__sub-qty">Quantity</p>
                <p className="summary-table__sub-co2">CO2e</p>
            </div>
            {!!summary ? 
            <div className="summary-table__list-wrapper">
                <ul className="summary-table__list">
                    {summary.map(summaryItem =>
                    <SummaryListItem summaryItem={summaryItem} key={v4()} />)}
                </ul>
            </div>
            : <p className="summary-table__loading">please select a category</p>}
            <div className="summary-table__total-wrapper">
                <p className="summary-table__total-text">Total: {totals[0].toFixed(1)} kg</p>
            </div>
        </div>
    )
}

export default SummaryTable
