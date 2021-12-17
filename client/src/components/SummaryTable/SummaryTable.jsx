import SummaryListItem from '../SummaryListItem/SummaryListItem';
import './SummaryTable.scss'
import CTAButton from '../CTAButton/CTAButton';
import { useState } from 'react';

function SummaryTable({ summary, totals, handleDelete, handleUpdateQty, saveQtyChanges }) {

    const [qtyInputBool, setQtyInputBool] = useState(false);

    const enableUpdateQuantity = () => {
        setQtyInputBool(!qtyInputBool)
    }

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
                    <SummaryListItem summaryItem={summaryItem} key={summaryItem.option[1]} handleDelete={handleDelete} handleUpdateQty={handleUpdateQty} qtyInputBool={qtyInputBool}/>)}
                </ul>
            </div>
            : <p className="summary-table__loading">please select a category</p>}
            <div className="summary-table__total-wrapper">
                {!qtyInputBool ? 
                <CTAButton buttonText={"Update Quantities"} handleOnClick={enableUpdateQuantity} />
                : <CTAButton buttonText={"Save Changes"} handleOnClick={() => {
                    saveQtyChanges()
                    enableUpdateQuantity()
                }} />
                }
                <p className="summary-table__total-text">Total: {totals[0].toFixed(1)} kg</p>
            </div>
        </div>
    )
}

export default SummaryTable
