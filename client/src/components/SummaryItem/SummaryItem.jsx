
import './SummaryItem.scss'

function SummaryItem({ summaryListItem }) {
    // console.log(grocery)
    return (
        <li className="summary-item__list-item">
            <p className="summary-item__item">{summaryListItem.food}</p>
            <div className="summary-item__item-stats">
                <p className="summary-item__item-text">{summaryListItem.carbon.toFixed(1)} kg</p>
                <p className="summary-item__item-text">{summaryListItem.land.toFixed(1)} m²</p>
                <p className="summary-item__item-text">{summaryListItem.water.toFixed(1)} l</p>
                <p className="summary-item__item-text">{summaryListItem.pollutants.toFixed(1)} g</p>
            </div>
        </li>
    )
}

export default SummaryItem;
