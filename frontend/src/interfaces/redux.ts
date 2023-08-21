import { UserModel } from "./models";

export interface InitialState {
  user: null | UserModel
  token: null | string
}

export interface LoginState {
  payload: {
    user: UserModel,
    token: string
  }
}

export interface ReduxState {
  user: InitialState
}