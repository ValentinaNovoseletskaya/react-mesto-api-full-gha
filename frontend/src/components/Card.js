import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card({onCardClick, onCardLike, onCardDelete, card}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}` 
      );;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return( <article className="element">
                <img src={`${card.link}`} alt={`${card.name}`} className="element__picture" onClick={handleClick} />                
                {isOwn && <button type="button" className="element__delete-button" onClick={handleDeleteClick} />}
                <div className="element__container">
                    <h2 className="element__text">{card.name}</h2>
                    <div className="element__like">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} ></button>
                        <span className="element__count">{card.likes && card.likes.length}</span>
                    </div>
                </div>             
            </article> 
    )
}

export default Card;



