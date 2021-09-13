import { SectionContainer } from '../Layout/SectionContainer'

/**
 * TypeScript
 */

interface IProgressStatusProps {
	progressDurationLeft: number
	progressDurationDone: number
	progressDurationLeftReadable: string
	progressDurationDoneReadable: string
}

/**
 * Styled Components
 */

export const ProgressStatus = ({
	progressDurationLeft = 0,
	progressDurationLeftReadable = '',
	progressDurationDone = 0,
	progressDurationDoneReadable = '',
}: IProgressStatusProps) => {
	if (progressDurationDone === 0 && progressDurationLeft === 0) return null
	return (
		<SectionContainer>
			{progressDurationDone === 0 && (
				<>
					Deze checklist duurt <strong>{progressDurationLeftReadable}</strong>
				</>
			)}
			{progressDurationLeft === 0 &&
				'Je hebt deze checklist afgewerkt en bent klaar voor de volgende stap!'}
			{progressDurationDone > 0 && progressDurationLeft > 0 && (
				<>
					Je hebt al <strong>{progressDurationDoneReadable}</strong> gewerkt!
					<br />
					Hou vol, je bent klaar binnen{' '}
					<strong>{progressDurationLeftReadable}</strong>
				</>
			)}
		</SectionContainer>
	)
}
