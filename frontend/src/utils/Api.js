class Api {
  constructor(options) {
    // тело конструктора
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  _getAuthHeader() {
    const jwt = localStorage.getItem('jwt');
    return jwt ? { Authorization: `Bearer ${jwt}` } : {};
  }

  checkError(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then((res) => {
      return this.checkError(res);
    });
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: { ...this._headers, ...this._getAuthHeader() },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this.checkError(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then((res) => {
      return this.checkError(res);
    });
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: { ...this._headers, ...this._getAuthHeader() },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this.checkError(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then((res) => {
      return this.checkError(res);
    });
  }

  setLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then((res) => {
      return this.checkError(res);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then((res) => {
      return this.checkError(res);
    });
  }

  setUserAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: { ...this._headers, ...this._getAuthHeader() },
      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => {
      return this.checkError(res);
    });
  }
}

const api = new Api({
  baseUrl: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
