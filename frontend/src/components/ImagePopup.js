function ImagePopup({card, onClose}) {
    const popupClass = `popup ${card && "popup_opened"}`;

    return (
        <div className={`${popupClass} image popup_background_dark`}>
            <div className="popup__image-container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <img src= {card && card.link} alt={card && card.name} className="popup__image-element" />
                <p className="popup__image-title">{card && card.name}</p>
            </div>        
        </div>
    );
}
        
export default ImagePopup;