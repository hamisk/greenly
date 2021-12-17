import './CTAButton.scss'

function CTAButton({ buttonText, handleOnClick }) {
    return (
        <div className="cta-button__container">
            <button className="cta-button__button" type="submit" onClick={handleOnClick}>{buttonText || "click me"}</button>
        </div>
    )
}

export default CTAButton
