import {useState, useContext, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {inputProfilePopup} from '../utils/formsConfig.js';

function EditProfilePopup({onUpdateUser, isOpen, isLoading, onClose}) {
    const currentUser = useContext(CurrentUserContext);
    const [defaultValue, setDefaultValue] =  useState({});
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const formDataKeys = Object.keys(formData);
    const isDisabled = () => {
        return formDataKeys.length === 0 || formDataKeys.some(item => !formData[item]) || formDataKeys.every(item => formData[item] === defaultValue[item]) || 
        Object.values(formErrors).some(item => item)      
    }

    useEffect(() => {
        setFormData({
            profileName: currentUser ? currentUser.name : '',
            profileJob: currentUser ? currentUser.about : '',
        })
        setDefaultValue({
            profileName: currentUser ? currentUser.name : '',
            profileJob: currentUser ? currentUser.about : '',
        })
      }, [currentUser, isOpen]);
 

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: formData.profileName,
            about: formData.profileJob,
        });
    }

    return (
        <PopupWithForm title='Редактировать профиль' name='profile' onSubmit={handleSubmit} buttonText={isLoading ? 'Сохранение...' : 'Сохранить' }  isOpen={isOpen} disabled={isDisabled()} onClose={onClose}>                
                {inputProfilePopup.map( ({type, required, name, className, placeholder, minLength, maxLength}) => {
                return  <div key={name}>
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
        
export default EditProfilePopup;