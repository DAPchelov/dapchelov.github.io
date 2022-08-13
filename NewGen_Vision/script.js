class UserService {

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    set username(username) {
        this._username = username;
    }
    set password(password) {
        this._password = password;
    }

    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }

    authenticate_user() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://examples.com/api/user/authenticate?username=' +
            this.username + '&password=' + this.password, true);
        xhr.responseType = 'json';

        return (xhr.onload = (xhr.status === '200') ? true : xhr.response);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    $('form').submit(() => {
        const res = new UserService($('#username'), $('#password')).authenticate_user();
        (res === true) ? document.location.href = '/home' : alert(res.error);
    });
});
