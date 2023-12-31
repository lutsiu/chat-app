import { IMessage, SearchedMessage, UserModel, MediaType, IContact, IFile, IStatus, SearchedMessageChat } from "./models";
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
  peopleSearch: SearchPeopleInitial;
  createContact: CreateContactInitial,
  chat: ChatStateInitial,
  chatUI: ChatUIState
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
  dataIsLoading: boolean,
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
  searchMessages: SearchedMessageChat[] | null
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

export interface CreateContactInitial {
  contactEmail: string
  contactQuery: string
}

export interface SearchPeopleInitial {
  searchBarIsActive: boolean,
  searchBarValue: string
}

export interface ChatStateInitial {
  dataIsLoading: boolean,
  chatId: string | null, 
  interlocutor: null | UserModel,
  chatMessages: IMessage[]
}

interface IMediaOverlay {
  showOverlay: boolean, 
  file: null | IFile
  message: null | IMessage
}
interface IContentContextMenu {
  x: number | null,
  y: number | null,
  showMenu: boolean,
  message: IMessage | null,
  file: IFile | null
}

interface IMessageContextMenu {
  x: number | null,
  y: number | null,
  showMenu: boolean,
  message: IMessage | null,
  editable: boolean,
  messageUpperPoint: number | undefined,
  mediaSrc: string,
  mediaType: MediaType
}

export interface ChatUIState {
  mediaOverlay: IMediaOverlay,
  contentContextMenu: IContentContextMenu
  messageContextMenu: IMessageContextMenu
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

export interface ActionWithContact {
  payload: IContact
}
export interface ActionChangeContactName {
  payload: {
    name: string,
    id: string
  }
}

export interface ActionWithStatus {
  payload: {
    isActive: boolean, 
    lastTimeSeen: Date
  }
}

export interface ActionWithMessageMediaOverlay {
  payload: IMediaOverlay
}

export interface ActionWithContentContextMenu {
  payload: IContentContextMenu
}
export interface ActionWithMessageContextMenu {
  payload: IMessageContextMenu
}

export interface ActionWithStatus {
  payload: IStatus
}