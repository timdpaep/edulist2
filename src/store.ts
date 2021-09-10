import { configureStore } from '@reduxjs/toolkit'
import appReducer from 'redux/appSlice'
import progressReducer from 'redux/progressSlice'

const store = configureStore({
	reducer: {
		app: appReducer,
		progress: progressReducer,
	},
})

// default export of our store
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
