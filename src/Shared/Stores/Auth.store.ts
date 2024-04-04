/* eslint-disable @typescript-eslint/no-unused-vars */
import {action, makeObservable, observable} from 'mobx';

class AuthStore {
  public username: string = '';
  public password: string = '';

  constructor() {
    makeObservable(this, {
      username: observable,
      password: observable,
      setUsername: action,
      setPassword: action,
    });
  }
  setUsername = (username: string) => {
    this.username = username;
  };
  setPassword = (password: string) => {
    this.password = password;
  };
}

export default AuthStore;
