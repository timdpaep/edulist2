import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { setSideBar, selectSideBar } from '../redux/appSlice'

export const useEduSideBar = () => {
	const dispatch = useAppDispatch()
	const sideBar = useAppSelector(selectSideBar)

	function openSideBar(type: string, value: string) {
		if (sideBar.open) {
			dispatch(setSideBar({ open: false }))
			setTimeout(() => dispatch(setSideBar({ open: true, value, type })), 500)
		} else {
			dispatch(setSideBar({ open: true, value, type }))
		}
	}

	return { openSideBar }
}
