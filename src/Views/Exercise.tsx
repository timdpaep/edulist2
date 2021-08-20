import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { AssetsSection, ReactMarkdownCustom } from 'Components'
import { EXERCISE } from '../graphql/queries'
import { IExercise } from '../interfaces'

/**
 * Types
 */

interface IExerciseProps {
	exerciseId: string
	loadingChanged: (loading: boolean) => void
}

interface IExerciseData {
	exercise: IExercise
}

export default ({ exerciseId, loadingChanged }: IExerciseProps) => {
	const { loading, error, data } = useQuery<IExerciseData>(EXERCISE, {
		variables: { id: exerciseId },
	})

	// when loading changed
	useEffect(() => loadingChanged(loading), [loadingChanged, loading])

	// return nothing when we are loading or having an error
	if (loading || error || !data) return null

	// destructure exercise
	const { exercise } = data

	return (
		<>
			{exercise.assets && (
				<AssetsSection style={{ marginBottom: '3rem' }} assets={exercise.assets} />
			)}
			<ReactMarkdownCustom markdown={exercise.description} />
		</>
	)
}
