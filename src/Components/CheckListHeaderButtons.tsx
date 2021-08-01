import { MouseEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { HeaderButtons, Button } from '.'

interface ICheckListHeaderButtonsProps {
	onOverviewClicked?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const CheckListHeaderButtons = ({
	onOverviewClicked,
}: ICheckListHeaderButtonsProps) => (
	<HeaderButtons>
		<Button color='blue' onClick={onOverviewClicked}>
			<FontAwesomeIcon icon={faList} />
		</Button>
	</HeaderButtons>
)
