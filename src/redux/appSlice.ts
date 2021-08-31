import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react'
import type { RootState } from '../store'

interface SideBarState {
	open: boolean
	type?: string
	value?: string
}

interface ModalState {
	open: boolean
	title?: string
	content: React.ReactNode
}

// Define a type for the slice state
interface AppState {
	sideBar: SideBarState
	modal: ModalState
}

// Define the initial state using that type
const initialState: AppState = {
	sideBar: {
		open: false,
		type: 'text',
		value: '',
	},
	modal: {
		open: false,
		title: '',
		content: null,
	},
}

export const appSlice = createSlice({
	name: 'app',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setSideBar: (state, action: PayloadAction<SideBarState>) => {
			// eslint-disable-next-line no-param-reassign
			state.sideBar = action.payload
		},
		setModal: (state, action: PayloadAction<ModalState>) => {
			// eslint-disable-next-line no-param-reassign
			state.modal = action.payload
		},
	},
})

export const { setSideBar, setModal } = appSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSideBar = (state: RootState) => state.app.sideBar
export const selectModal = (state: RootState) => state.app.modal

export default appSlice.reducer
