import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';
import {inputPlacePopup} from '../utils/formsConfig.js';

function AddPlacePopup ({onAddPlace, isOpen, isLoading, onClose}) {
    const [formData, setFormData] = useState({
        placeName: '',
        placeImage: '',
    });
    
    const [formErrors, setFormErrors] = useState({});
    const formDataValues = Object.values(formData);
    const isDisabled = () => {
        return formDataValues.length === 0 || formDataValues.some(item => !item) || Object.values(formErrors).some(item => item)        
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: formData.placeName,
            link: formData.placeImage
        });
        
    }

    useEffect(() => {
        setFormData({
            placeName: '',
            placeImage: '',
        });
    }, [isOpen]);

    return (
        <PopupWithForm title='Новое место' name='place' buttonText={isLoading ? 'Сохранение...' : 'Создать' }  onSubmit={handleSubmit} isOpen={isOpen} disabled={isDisabled()} onClose={onClose}>
            {inputPlacePopup.map( ({type, required, name, className, placeholder, minLength, maxLength}) => {
                return <div key={name}>
                    <input 
                    className={className}
                    placeholder={placeholder}
                    minLength={minLength}
                    maxLength={maxLength}
                    type={type}
                    required={required}
                    name={name}
                    value={formData[name] || '' }
                    onChange={ e=>{
                        setFormData({...formData, [name]: e.target.value})
                        const errorMessage = e.target.validationMessage
                        setFormErrors({...formErrors, [name]: errorMessage || ''})
                    } }
                    />
                    <span className="popup__error_visible" >{formErrors[name]}</span>
                    </div>
            })}
        </PopupWithForm>
    );
}
        
export default AddPlacePopup ;