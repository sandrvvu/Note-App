import { makeAutoObservable } from "mobx";

export default class UserApp {
  constructor() {
    this._isAuth = true;
    this._user = {};
    this._name = "";
    this._id = -1;
    makeAutoObservable(this);
  }
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  setName(name) {
    this._name = name;
  }
  setID(id) {
    this._id = id;
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  getName() {
    return this._name;
  }

  getID() {
    return this._id;
  }
}
