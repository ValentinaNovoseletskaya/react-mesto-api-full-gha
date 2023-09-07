import {useState} from 'react';

function Login({onLogIn}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
 
  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    onLogIn({
        email: formValue.email,
        password: formValue.password,
    });
  }

  return (
    <div className="sign">
      <p className="sign__welcome">
        Вход
      </p>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input className="sign__input" required id="email" name="email" type="text" placeholder="Email" onChange={ e=>{
          setFormValue({...formValue, email: e.target.value})
        } } />
        <input className="sign__input" required id="password" name="password" type="password" placeholder="Пароль" 
        onChange={ e=>{
          setFormValue({...formValue, password: e.target.value})
        } } />
        <button className='popup__save-button sign__button'>Войти</button>
      </form>      
    </div>
  );
}

export default Login;