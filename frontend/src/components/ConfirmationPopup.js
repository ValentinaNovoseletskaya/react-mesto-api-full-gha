import PopupWithForm from './PopupWithForm.js';

function ConfirmationPopup({card, onConfirmDelete, onClose}) {    
    function handleSubmit(e) {
        e.preventDefault();
        onConfirmDelete(card);
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={card} onClose={onClose} title='Вы уверены?' name='confirmation' buttonText='Да' />
    );
}
        
export default ConfirmationPopup;