import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import userReducer from "./state/user.ts";
import uiReducer from "./state/ui.ts";
import messageReducer from "./state/message.ts";
import createGroupReducer from "./state/createGroup.ts";
import createContactReducer from './state/createContact.ts'
import chatReducer from './state/chat.ts'
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";
import peopleSearchReducer from "./state/peopleSearch.ts";

const persistConfig = { key: "root", storage, version: 1 };

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  createGroup: createGroupReducer,
  message: messageReducer,
  peopleSearch: peopleSearchReducer,
  createContact: createContactReducer,
  chat: chatReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>
);
