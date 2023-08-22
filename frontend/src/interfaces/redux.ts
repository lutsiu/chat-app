import { UserModel } from "./models";

export interface UserInitialState {
  user: null | UserModel
  token: null | string
}

export interface UiInitialState {
  showOverlay: boolean,
  showLeftMenu: boolean,
  showCreateGroupStep1: boolean,
  showCreateGroupStep2: boolean,
  showContacts: boolean,
  showSettings: boolean,
  showMyAccountSettings: boolean,
}

export interface LoginState {
  payload: {
    user: UserModel,
    token: string
  }
}

export interface ReduxState {
  user: UserInitialState,
  ui: UiInitialState
}