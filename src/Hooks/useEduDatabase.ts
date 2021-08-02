import { useState } from 'react'
import EduDatabase from '../library/edudatabase'

export const useEduDatabase = () => {
	const [isLoading, setIsLoading] = useState(false)

	const isChecklistItemChecked = async (
		checklistId: string,
		checklistItemId: string
	) => {
		setIsLoading(true)
		const c =
			(await EduDatabase.checklistChecks
				.where({ checklistId, checklistItemId })
				.count()) > 0
		setIsLoading(false)
		return c
	}

	const updateChecked = async (
		checked: boolean,
		checklistId: string,
		checklistItemId: string
	) => {
		setIsLoading(true)
		if (
			(await EduDatabase.checklistChecks
				.where({ checklistId, checklistItemId })
				.count()) === 0 &&
			checked
		) {
			await EduDatabase.checklistChecks.add({ checklistId, checklistItemId })
			setIsLoading(false)
		} else if (!checked) {
			await EduDatabase.checklistChecks
				.where({ checklistId, checklistItemId })
				.delete()
			setIsLoading(false)
		}
	}

	return { isLoading, updateChecked, isChecklistItemChecked }
}
