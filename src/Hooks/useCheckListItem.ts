import { useEffect, useState } from 'react'
import { ICheckListItem } from 'interfaces'
import { setCheckChecklistItem } from '../redux/progressSlice'
import { useEduDatabase, useAppDispatch } from '.'

interface IUseCheckListItemProps {
	checkListItem: ICheckListItem
	checkListId: string
	checked?: boolean
}

export const useCheckListItem = ({
	checkListId,
	checkListItem,
}: IUseCheckListItemProps) => {
	const { updateChecked, isChecklistItemChecked } = useEduDatabase()
	const [isChecked, setIsChecked] = useState<boolean>(false)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (checkListId && checkListItem) {
			isChecklistItemChecked(checkListId, checkListItem?.id).then(c =>
				setIsChecked(c)
			)
		}
	}, [])

	const changeChecked = (c: boolean) => {
		// Updates the checked state in the frontend state
		setIsChecked(c)
		// updates the checked state in the indexedDB database
		updateChecked(c, checkListId, checkListItem?.id)
		// updates the checked state in the redux store))
		dispatch(
			setCheckChecklistItem({
				checklistItemId: checkListItem?.id,
				checked: c,
			})
		)
	}

	return { isChecked, changeChecked }
}
