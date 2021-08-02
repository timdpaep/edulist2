import { useEffect, useState } from 'react'
import { ICheckListItem } from 'interfaces'
import { useEduDatabase } from '.'

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

	useEffect(() => {
		if (checkListId && checkListItem) {
			isChecklistItemChecked(checkListId, checkListItem?.id).then(c =>
				setIsChecked(c)
			)
		}
	}, [])

	const changeChecked = (c: boolean) => {
		setIsChecked(c)
		updateChecked(c, checkListId, checkListItem?.id)
	}

	return { isChecked, changeChecked }
}
