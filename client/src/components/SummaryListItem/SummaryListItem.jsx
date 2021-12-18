import './SummaryListItem.scss'
import minus from '../../assets/icons/red-minus.png'

function SummaryListItem({ summaryItem, handleDelete, qtyInputBool, handleUpdateQty }) {
    let option = summaryItem.option[0]
    let qty = summaryItem.qty

    // userActivityId for use when deleting from database (deleting activity form summary on Dashboard page)
    // option[1] - for deleting from summary on activities page.
    let activityId = summaryItem.userActivityId || summaryItem.option[1]
    
    return (
        <li className="summary-item__list-item">
            <p className="summary-item__activity">{summaryItem.activity}</p>
            <p className="summary-item__option">{option.length > 15 ? option.slice(0,15) + "..." : option}</p>

            {qtyInputBool ? 
            <input type="number" className="summary-item__qty-input" 
                defaultValue={qty} 
                onChange={(e) => {
                    handleUpdateQty(e, summaryItem)}}/>
            : <p className="summary-item__qty">{qty}</p>
            }

            <p className="summary-item__co2">{(qty * summaryItem.carbon).toFixed(1)} kg</p>
            <button className="summary-item__activity-delete" 
                onClick={() => {
                    handleDelete(activityId)
                    }}>
                <img src={minus} alt="delete icon" className="summary-item__delete-icon"/>
            </button>
        </li>
    )
}

export default SummaryListItem;
