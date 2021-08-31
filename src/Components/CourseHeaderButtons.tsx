import { MouseEvent } from 'react'
import { HeaderButtons, Button } from '.'
import canvasLogo from '../images/canvas.svg'
import teamsLogo from '../images/ms-teams.svg'

interface ICourseHeaderButtonsProps {
	showCanvas: boolean
	showTeamsChannelUrl: boolean
	onCanvasClicked?: (event: MouseEvent<HTMLButtonElement>) => void
	onTeamsChannelClicked?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const CourseHeaderButtons = ({
	showCanvas = false,
	showTeamsChannelUrl = false,
	onCanvasClicked,
	onTeamsChannelClicked,
}: ICourseHeaderButtonsProps) => (
	<HeaderButtons>
		{showCanvas && (
			<Button color='orange' onClick={onCanvasClicked}>
				<img style={{ width: '1em' }} src={canvasLogo} alt='Canvas Logo' />
			</Button>
		)}
		{showTeamsChannelUrl && (
			<Button color='teamsPurple' onClick={onTeamsChannelClicked}>
				<img style={{ width: '1em' }} src={teamsLogo} alt='Teams Logo' />
			</Button>
		)}
	</HeaderButtons>
)
