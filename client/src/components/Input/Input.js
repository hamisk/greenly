import "./Input.scss";

function Input({ label, name, type, placeholder, defaultValue, valid }) {
    return (
        <div className="field">
            <label htmlFor={name} className="field__label">
                {label}
            </label>
            <input type={type} id={name} name={name} placeholder={placeholder} defaultValue={defaultValue} className={valid ? "field__input" : "field__input required"} />
        </div>
    );
}

export default Input;
