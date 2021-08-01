import { MouseEvent } from 'react'
import { HeaderButtons, Button } from '.'

interface ICourseHeaderButtonsProps {
	onCanvasClicked?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const CourseHeaderButtons = ({
	onCanvasClicked,
}: ICourseHeaderButtonsProps) => (
	<HeaderButtons>
		<Button color='orange' onClick={onCanvasClicked}>
			Canvas
		</Button>
	</HeaderButtons>
)
