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
			{progressDurationDone === 0 &&
				`De totale duur van de checklist is ${progressDurationLeftReadable}. Vink de verschillende checks af en start met leren!`}
			{progressDurationLeft === 0 &&
				'Je hebt deze checklist afgewerkt en bent klaar voor de volgende stap!'}
			{progressDurationDone > 0 &&
				progressDurationLeft > 0 &&
				`Je hebt ${progressDurationDoneReadable} afgewerkt. Nog ${progressDurationLeftReadable} te gaan.`}
		</SectionContainer>
	)
}
