import {useContext} from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({cards, onCardClick, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar}) {    
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__structure">
                    <div className="profile__avatar" onClick={onEditAvatar}> 
                        <img src={currentUser && currentUser.avatar} alt={currentUser && currentUser.name} className="profile__avatar-img" /> 
                    </div>                    
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser && currentUser.name}</h1>
                        <button type="button" onClick={onEditProfile} className="profile__edit-button"></button>
                        <p className="profile__job">{currentUser && currentUser.about}</p>
                    </div>                    
                </div>
                <button type="button" onClick={onAddPlace} className="profile__add-button"></button>
            </section>
            <section className="elements" aria-label="Карточки мест">
                {cards.map((card) => (
                    <Card onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} card={card}/> 
                ))}     
            </section>
        </main>
    );
}

export default Main;