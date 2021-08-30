import { MouseEvent } from 'react'
import { HeaderButtons, Button } from '.'

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
				Canvas
			</Button>
		)}
		{showTeamsChannelUrl && (
			<Button color='teamsPurple' onClick={onTeamsChannelClicked}>
				Microsft Teams
			</Button>
		)}
	</HeaderButtons>
)
