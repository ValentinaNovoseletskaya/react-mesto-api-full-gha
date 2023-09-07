import {useState, useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm.js';
import {inputAvatarPopup} from '../utils/formsConfig.js';

function EditAvatarPopup({onUpdateAvatar, isOpen, isLoading, onClose}) {
    const avatarRef = useRef('');
    const [formErrors, setFormErrors] = useState({});

    const isDisabled = () => {
        return avatarRef.current.value === "" || Object.values(formErrors).some(item => item)       
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm title='Обновить аватар' name='avatar' buttonText={isLoading ? 'Сохранение...' : 'Сохранить' } onSubmit={handleSubmit} isOpen={isOpen} disabled={isDisabled()} onClose={onClose}>
            {inputAvatarPopup.map( ({type, required, name, className, placeholder}) => {
                return <div key={name}>
                    <input 
                    className={className}
                    placeholder={placeholder}
                    type={type}
                    required={required}
                    name={name}
                    ref={avatarRef}
                    onChange={ e=>{ 
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
        
export default EditAvatarPopup;