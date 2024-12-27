import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/redux/actions/category_Slice"
import storage from 'redux-persist/lib/storage';
import {  persistReducer } from "redux-persist";
import {combineReducers} from '@reduxjs/toolkit'
// import { version } from "os";

const persistConfig = {
  key: 'root',
  version:1,
  storage,
};

const rootReducer = combineReducers({
  category: categoryReducer, //
});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
    devTools: import.meta.env.MODE !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these paths for non-serializable checks
          ignoredActions: ['persist/PERSIST'],
          ignoredPaths: ['register'], // Ignore the specific non-serializable value
        },
      }),
  });

  export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
