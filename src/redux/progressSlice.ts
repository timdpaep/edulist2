import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProgress } from 'interfaces'
import dayjs from 'dayjs'
import type { RootState } from '../store'
import { calculatePercentage, getDurationDone } from '../library/progress'

// Define the initial state using that type
const initialState: IProgress = {
	totalPercentage: 0,
	totalDuration: 0,
	totalDurationReadable: '',
	totalDurationSections: [],
	totalDurationLeft: 0,
	totalDurationDone: 0,
	totalDurationLeftReadable: '',
	totalDurationDoneReadable: '',
}

export const pogressSlice = createSlice({
	name: 'progress',
	initialState,
	reducers: {
		setProgress: (state, action: PayloadAction<IProgress>) => {
			const {
				totalPercentage,
				totalDuration,
				totalDurationReadable,
				totalDurationSections,
				totalDurationDone,
				totalDurationLeft,
				totalDurationLeftReadable,
				totalDurationDoneReadable,
			} = action.payload

			// set the state
			state.totalPercentage = totalPercentage
			state.totalDuration = totalDuration
			state.totalDurationReadable = totalDurationReadable
			state.totalDurationSections = totalDurationSections
			state.totalDurationDone = totalDurationDone
			state.totalDurationLeft = totalDurationLeft
			state.totalDurationLeftReadable = totalDurationLeftReadable
			state.totalDurationDoneReadable = totalDurationDoneReadable
		},

		setCheckChecklistItem: (
			state,
			action: PayloadAction<{
				checklistItemId: string
				checked: boolean
			}>
		) => {
			const { checklistItemId, checked } = action.payload

			// recalculate the total duration of each section
			state.totalDurationSections = state.totalDurationSections.map(tds => {
				tds.checklistItemProgress = tds.checklistItemProgress.map(cip => {
					cip.checked = cip.id === checklistItemId ? checked : cip.checked
					return cip
				})
				return tds
			})

			// calculate the percentage
			state.totalPercentage = calculatePercentage(state)

			// get the total duration left
			state.totalDurationDone = getDurationDone(state)
			state.totalDurationLeft = state.totalDuration - state.totalDurationDone
			state.totalDurationDoneReadable = dayjs
				.duration(state.totalDurationDone * 1000)
				.format('HH[u]mm[m]ss[s]')
			state.totalDurationLeftReadable = dayjs
				.duration(state.totalDurationLeft * 1000)
				.format('HH[u]mm[m]ss[s]')
		},
	},
})

export const { setProgress, setCheckChecklistItem } = pogressSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProgress = (state: RootState) => state.progress

export default pogressSlice.reducer
