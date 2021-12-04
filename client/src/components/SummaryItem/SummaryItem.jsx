
import './SummaryItem.scss'

function SummaryItem({ summaryListItem }) {
    // console.log(summaryListItem)
    return (
        <li className="summary-item__list-item">
            <p className="summary-item__item">{summaryListItem.activity}</p>
            <div className="summary-item__item-stats">
                <p className="summary-item__item-text">{summaryListItem.qty}</p>
                <p className="summary-item__item-text">{summaryListItem.option}</p>
                <p className="summary-item__item-text">{summaryListItem.carbon.toFixed(1)} kg</p>
                {/* <p className="summary-item__item-text">{summaryListItem.pollutants.toFixed(1)} g</p> */}
            </div>
        </li>
    )
}

export default SummaryItem;
