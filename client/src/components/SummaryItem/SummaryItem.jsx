import './SummaryItem.scss'

function SummaryItem({ summaryListItem }) {
    return (
        <li className="summary-item__list-item">
            <p className="summary-item__item">{summaryListItem.activity}</p>
            <div className="summary-item__item-stats">
                <p className="summary-item__item-text">{summaryListItem.qty}</p>
                <p className="summary-item__item-text">{summaryListItem.option[0]}</p>
                <p className="summary-item__item-text">{summaryListItem.carbon.toFixed(1)} kg</p>
            </div>
        </li>
    )
}

export default SummaryItem;
