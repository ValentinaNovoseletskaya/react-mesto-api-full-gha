import {api} from '../utils/Api.js';
import {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import InfoTooltip from './InfoTooltip.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isLoadingPlacePopup, setIsLoadingPlacePopup] = useState(false);
    const [isLoadingProfilePopup, setIsLoadingProfilePopup] = useState(false);
    const [isLoadingAvatarPopup, setIsLoadingAvatarPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [toDeleteCard, setToDeleteCard] = useState(null);
    const [currentUser, setCurrentUser] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
    const [cards, setCards] = useState([]);
    const [useLoggedInToken, setUseLoggedInToken] = useState(false);
    const navigate = useNavigate();
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    const [isAuthFail, setIsAuthFail] = useState(false);

    useEffect(() => {
       if(useLoggedInToken) {
        api.getAppInfo()
            .then(([userData, initialCards]) => {
                setCards(initialCards);
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [useLoggedInToken]);

    useEffect(() => {
        const token = localStorage.getItem('token') 
        if (token) {
            api.getUserInfo()
            .then((data) => {
                setUseLoggedInToken(true);
                setCurrentUserEmail(data.email);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
        }
        // eslint-disable-next-line
     }, []);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    
    function handleDeleteClick(card) {
        setToDeleteCard(card);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setToDeleteCard(null);
        setIsSignupSuccess(false);
        setIsAuthFail(false);
    }

    function handleSubmit(request) {
        request()
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.error(`Ошибка: ${err}`);
            })
            .finally(() => {
                setIsLoadingPlacePopup(false);
                setIsLoadingProfilePopup(false);
                setIsLoadingAvatarPopup(false);
            });
    }

    function handleCardDelete(card) {
        function makeRequest() { 
            return api.removeCard(card._id).then(() => {
                const newCards = cards.filter(c => c._id !== card._id);
                setCards(newCards);
                closeAllPopups();
            });
        }
        handleSubmit(makeRequest);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        function makeRequest() { 
            return api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            });
        }
        handleSubmit(makeRequest);
    }

    function handleUpdateUser(user) {
        function makeRequest() { 
            return api.editUserInfo(user).then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            });
        }
        setIsLoadingProfilePopup(true);
        handleSubmit(makeRequest);
    }

    function handleUpdateAvatar(avatar) {
        function makeRequest() { 
            return api.editUserAvatar(avatar).then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            });
        }
        setIsLoadingAvatarPopup(true);
        handleSubmit(makeRequest);
    }

    function handleAddPlaceSubmit(card) {        
        function makeRequest() { 
            return api.createNewCard(card).then((newCard) => {
                setCards([newCard, ...cards]);
            });
        }
        setIsLoadingPlacePopup(true);
        handleSubmit(makeRequest);
    }

    function handleLoginSubmit(formData) {
        api.signin(formData)
            .then((data) => {
              setUseLoggedInToken(true);
              localStorage.setItem('token', data.token);
              setCurrentUserEmail(formData.email);
              navigate('/');
            }).catch((err) => {
                console.log(err);
                setIsAuthFail(true);
            });
    }

    function handleRegisterSubmit(formData) {        
          api.signup(formData)
            .then(() => { 
                setIsSignupSuccess(true);
                navigate('/signin');
            }).catch((err) => {
                console.log(err);
                setIsAuthFail(true);
            });
    }

    function handleLoggedOut() {        
        setUseLoggedInToken(false);
        localStorage.removeItem('token');
        navigate('/signin');
    }     

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="body">
            <div className="page">
            <Header onLogOut={handleLoggedOut} headerText={currentUserEmail} />
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute element={Main} loggedIn={useLoggedInToken} cards={cards} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleDeleteClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} 
                />
                } />
                <Route path="/signup" element={ 
                    <Register onRegister={handleRegisterSubmit}/>
                } />
                <Route path="/signin" element={
                    <Login onLogIn={handleLoginSubmit} loggedIn={useLoggedInToken} />
                } />
            </Routes>
            <Footer />
        </div>
            <InfoTooltip isOpenSuccess={isSignupSuccess} isOpenFail={isAuthFail} onClose={closeAllPopups} /> 
            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} isLoading={isLoadingProfilePopup} onClose={closeAllPopups} />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} isLoading={isLoadingAvatarPopup} onClose={closeAllPopups} />
            <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} isLoading={isLoadingPlacePopup} onClose={closeAllPopups} />
            <ConfirmationPopup card={toDeleteCard} onConfirmDelete={handleCardDelete} onClose={closeAllPopups} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
