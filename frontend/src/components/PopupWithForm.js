function PopupWithForm({isOpen, disabled, name, title, onClose, onSubmit, children, buttonText}) {
    const popupClass = `popup ${isOpen ? "popup_opened" : ''}`;
    const buttonClass = `popup__save-button ${disabled ? "popup__save-button_disable" : ''} `;
    
    return (
        <div className={`${popupClass} popup_type_${name}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__content" onSubmit={onSubmit} name="form" noValidate>
                    {children} 
                    <button disabled={disabled} type="submit" className={buttonClass}>{buttonText}</button>   
                </form>
            </div>
        </div>
    );
}
        
export default PopupWithForm;