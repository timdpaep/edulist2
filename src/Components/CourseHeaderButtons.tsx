import { MouseEvent } from 'react'
import { HeaderButtons, Button } from '.'

interface ICourseHeaderButtonsProps {
	showCanvas: boolean
	onCanvasClicked?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const CourseHeaderButtons = ({
	showCanvas = false,
	onCanvasClicked,
}: ICourseHeaderButtonsProps) => (
	<HeaderButtons>
		{showCanvas && (
			<Button color='orange' onClick={onCanvasClicked}>
				Canvas
			</Button>
		)}
	</HeaderButtons>
)
