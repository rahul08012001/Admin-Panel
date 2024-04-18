
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";

const persistConfig = {
key: "root",
  storage,
 };

const persistedReducer = persistReducer(persistConfig, authSlice);
const store = configureStore({
      reducer: {
    isLoginIn: persistedReducer,
    //    isprofileIn:persistedReducer
 },
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
 const persistor = persistStore(store);
 export { store, persistor };
