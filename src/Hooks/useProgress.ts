import { useEffect, useState, useCallback } from 'react'
import { getProgress } from '../library/progress'
import { setProgress, selectProgress } from '../redux/progressSlice'
import { useAppDispatch, useAppSelector } from '.'

export const useProgress = (slug: string) => {
	const [checklistSlug, setChecklistSlug] = useState<string>(slug)
	const [loading, setLoading] = useState<boolean>(true)
	const dispatch = useAppDispatch()
	const currentProgress = useAppSelector(selectProgress)

	const getProgressForSection = useCallback(
		(sectionId: string) => {
			if (currentProgress && currentProgress.totalDurationSections.length > 0) {
				return currentProgress.totalDurationSections.find(
					section => section.id === sectionId
				)
			}
			return null
		},
		[currentProgress]
	)

	useEffect(() => {
		setLoading(true)
		getProgress(checklistSlug).then(progress => {
			dispatch(setProgress(progress))
			setLoading(false)
		})
	}, [checklistSlug])

	return {
		getProgressForSection,
		currentProgress,
		setChecklistSlug,
		loading,
	}
}
