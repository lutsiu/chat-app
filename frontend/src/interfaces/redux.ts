import { IMessage, SearchedMessage, UserModel } from "./models";
import { Socket } from "socket.io-client";
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
  message: MessageInitialState
}

export interface UiInitialState {
  showOverlay: boolean;
  showLeftMenu: boolean;
  showCreateGroupStep1: boolean;
  showCreateGroupStep2: boolean;
  showContacts: boolean;
  showCreateContact: boolean;
  showSettings: boolean;
  showMyAccountSettings: boolean;
  showEditContactProfile: boolean;
  showWarningPopup: boolean;
  showSearchBar: boolean
}

export interface MessageInitialState {
  replyToMessage: {
    show: boolean;
    message: IMessage | null;
    senderId: string;
    messageUpperPoint: undefined | number;
  };
  editMessage: {
    show: boolean;
    message: IMessage | null;
    messageUpperPoint: undefined | number;
  };
  forwardMessage: {
    show: boolean;
    message: IMessage | null;
  };
  searchMessages: SearchedMessage[] | null
  scrollToMessage: {
    top: number;
  } | null;
  messagesContainerScrollTop: number | null
}

export interface CreateGroupInitial {
  groupName: string;
  groupImg: null | Blob;
  groupUsers: string[];
}

export interface ActionWithGroup {
  payload: {
    groupName: string;
    groupImg: Blob | null;
  };
}

export interface ActionWithGroupUser {
  payload: {
    userId: string;
  };
}

export interface ActionWithMessage {
  payload: {
    message: IMessage | null
  }
}

export interface UIActionWithMessage {
  payload: {
    message: IMessage | null;
    show: boolean;
    messageUpperPoint: undefined | number;
  };
}
export interface ActionWithReply extends ActionWithMessage {
  payload: {
    message: IMessage | null;
    show: boolean;
    messageUpperPoint: undefined | number;
    senderId: string;
  };
}
export interface ActionWithScroll {
  payload: {
    top: number | null;
  };
}

export interface ActionWithSearch {
  payload: SearchedMessage[] | null
}