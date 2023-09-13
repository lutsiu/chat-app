import { UserModel } from "./models";
import {Socket} from 'socket.io-client'
export interface UserInitialState {
  user: null | UserModel;
  token: null | string;
}
export interface LoginState {
  payload: {
    user: UserModel;
    token: string;
  };
}
export interface ReduxState {
  user: UserInitialState;
  ui: UiInitialState;
  createGroup: CreateGroupInitial;

}

export interface UiInitialState {
  showOverlay: boolean;
  showLeftMenu: boolean;
  showCreateGroupStep1: boolean;
  showCreateGroupStep2: boolean;
  showContacts: boolean;
  showCreateContact: boolean,
  showSettings: boolean;
  showMyAccountSettings: boolean;
  showEditContactProfile: boolean;
  showWarningPopup: boolean
}


export interface CreateGroupInitial {
  groupName: string;
  groupImg: null | Blob;
  groupUsers: string[]
}

export interface ActionWithGroup {
    payload: {
      groupName: string;
      groupImg: Blob | null;
    };
}

export interface ActionWithGroupUser {
  payload: {
    userId: string
  }
}

