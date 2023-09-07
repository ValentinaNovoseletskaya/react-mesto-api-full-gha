class AuthApi {
    constructor(baseUrl) {
      this._baseUrl = baseUrl;
    }
    
    _request(url, options) {
      return fetch(url, options).then(this.resolveFetch)
    }

    resolveFetch(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }    
      
    signin(data) {
      return this._request(`${this._baseUrl}/signin`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
      });
    }

    signup(data) {
        return this._request(`${this._baseUrl}/signup`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
        }
        });
    }

    getUserInfo(token) {
      return this._request(`${this._baseUrl}/users/me`, {
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
      });
    }
}

const apiSettings = {
    host: 'https://auth.nomoreparties.co'
};

const baseUrl = apiSettings.host;

export const authApi = new AuthApi(baseUrl);