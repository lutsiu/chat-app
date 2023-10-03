import { IMessage, SearchedMessage, UserModel, MediaType } from "./models";
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
  message: MessageInitialState;
  peopleSearch: SearchPeopleInitial
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
  showSearchBar: boolean;
  dataIsLoading: boolean
}

export interface MessageInitialState {
  replyToMessage: {
    show: boolean;
    message: IMessage | null;
    senderId: string;
    messageUpperPoint: undefined | number;
    mediaPath: null | string,
    mediaType: MediaType
  };
  editMessage: {
    show: boolean;
    message: IMessage | null;
    messageUpperPoint: undefined | number;
    mediaPath: null | string,
    mediaType: MediaType
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

export interface SearchPeopleInitial {
  searchBarIsActive: boolean,
  searchBarValue: string
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
    mediaPath: null | string,
    mediaType: MediaType
  };
}
export interface ActionWithReply{
  payload: {
    message: IMessage | null;
    show: boolean;
    messageUpperPoint: undefined | number;
    senderId: string;
    mediaPath: null | string,
    mediaType: MediaType
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