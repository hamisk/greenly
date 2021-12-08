import "./Input.scss";

function Input({ label, name, type, placeholder, defaultValue, invalid }) {
    return (
        <div className="field">
            <label htmlFor={name} className="field__label">
                {label}
            </label>
            <input type={type} id={name} name={name} placeholder={placeholder} defaultValue={defaultValue} className={invalid ? "field__input required" : "field__input"} />
        </div>
    );
}

export default Input;
