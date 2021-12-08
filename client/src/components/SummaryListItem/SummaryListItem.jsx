import './SummaryListItem.scss'

function SummaryListItem({ summaryItem }) {
    let option = summaryItem.option[0]
    return (
        <li className="summary-item__list-item">
            <p className="summary-item__activity">{summaryItem.activity}</p>
            <p className="summary-item__option">{option.length > 15 ? option.slice(0,15) + "..." : option}</p>
            <p className="summary-item__qty">{summaryItem.qty}</p>
            <p className="summary-item__co2">{summaryItem.carbon.toFixed(1)} kg</p>
        </li>
    )
}

export default SummaryListItem;
