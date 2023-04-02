import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";

// configure store to funkcja z redux toolkita do której są przekazywane reducery
const store = configureStore({
  reducer: {
    //counter: counterReducer, // Ta linijka mowi nam o tym ze chcemy mieć state.counter, którego sposób aktualizacji będzie określany przez reducery counterReducer w momencie dipatchowania
    // tasks: tasksReducer,
    theme: themeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
