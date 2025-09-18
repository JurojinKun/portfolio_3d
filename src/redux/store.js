import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";

import languageReducer from "./slices/languageSlice";
import homeReducer from "./slices/homeSlice";

const languagePersistConfig = {
  key: "language",
  storage,
};

const homePersistConfig = {
  key: "home",
  storage: sessionStorage,
};

const persistedReducer = {
  language: persistReducer(languagePersistConfig, languageReducer),
  home: persistReducer(homePersistConfig, homeReducer),
};

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
