import './SummaryListItem.scss'

function SummaryListItem({ summaryItem }) {
    return (
        <li className="summary-item__list-item">
            <p className="summary-item__activity">{summaryItem.activity}</p>
            <p className="summary-item__option">{summaryItem.option[0]}</p>
            <p className="summary-item__qty">{summaryItem.qty}</p>
            <p className="summary-item__co2">{summaryItem.carbon.toFixed(1)} kg</p>
        </li>
    )
}

export default SummaryListItem;
