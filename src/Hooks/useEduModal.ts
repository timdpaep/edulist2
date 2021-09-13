import { EduModalType } from 'enums'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { setModal, selectModal } from '../redux/appSlice'

export const useEduModal = () => {
	const dispatch = useAppDispatch()
	const sideBar = useAppSelector(selectModal)

	function openModal({
		title,
		value,
		type,
	}: {
		title?: string
		value: string
		type: EduModalType
	}) {
		if (sideBar.open) {
			dispatch(
				setModal({ open: false, value: '', type: EduModalType.None, title: '' })
			)
		} else {
			dispatch(setModal({ open: true, title, type, value }))
		}
	}

	return { openModal }
}
