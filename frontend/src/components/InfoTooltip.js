import success from '../images/success.svg';
import fail from '../images/fail.svg';

function InfoTooltip({isOpenSuccess, isOpenFail, onClose}) {
    const popupClass = `popup popup_type_status ${isOpenSuccess || isOpenFail ? "popup_opened" : ''}`;

    return (
        <div className={popupClass}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                { isOpenSuccess && <>
                    <img src={success} alt='' className="popup__status-image" />
                    <h2 className="popup__status">Вы успешно зарегистрировались! </h2>
                </>
                }
                { isOpenFail && <>
                    <img src={fail} alt='' className="popup__status-image" />
                    <h2 className="popup__status">Что-то пошло не так! Попробуйте ещё раз.</h2>
                </>
                }
            </div>
        </div>        
    );
}
        
export default InfoTooltip;