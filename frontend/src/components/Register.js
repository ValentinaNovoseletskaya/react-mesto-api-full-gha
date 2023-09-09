import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function Register({onRegister}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    onRegister({
      email: formValue.email,
      password: formValue.password,
    });
  }

  return (
    <div className="sign">
      <p className="sign__welcome">
        Регистрация
      </p>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input className="sign__input" id="email" name="email" type="email" placeholder="Email" 
        value={formValue.email || '' }
        onChange={ e=>{
          setFormValue({...formValue, email: e.target.value})
        } } />
        <input className="sign__input" id="password" name="password" type="password" placeholder="Пароль" 
        value={formValue.password || '' }
        onChange={ e=>{
          setFormValue({...formValue, password: e.target.value})
        } } />
        <button type="submit" className='popup__save-button sign__button'>Зарегистрироваться</button>
      </form>      
      <div className="sign__login">
        <p className="sign__login-text">Уже зарегистрированы?&nbsp;</p>
        <Link to="/signin" className="sign__link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;