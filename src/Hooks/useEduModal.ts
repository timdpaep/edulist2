import React from 'react'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { setModal, selectModal } from '../redux/appSlice'

export const useEduModal = () => {
	const dispatch = useAppDispatch()
	const sideBar = useAppSelector(selectModal)

	function openModal({
		title,
		content,
	}: {
		title?: string
		content: React.ReactNode
	}) {
		if (sideBar.open) {
			dispatch(setModal({ open: false, content: null }))
		} else {
			dispatch(setModal({ open: true, title, content }))
		}
	}

	return { openModal }
}
