import { MouseEvent } from 'react'
import { HeaderButtons, Button, SvgIcon } from '.'
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
				<SvgIcon source={canvasLogo} title='Canvas Logo' />
			</Button>
		)}
		{showTeamsChannelUrl && (
			<Button color='teamsPurple' onClick={onTeamsChannelClicked}>
				<SvgIcon source={teamsLogo} title='Teams Logo' />
			</Button>
		)}
	</HeaderButtons>
)
