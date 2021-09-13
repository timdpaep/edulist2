import { MouseEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import { HeaderButtons, Button, SvgIcon } from '.'
import {
	DropDownButton,
	DropDownMenu,
	DropDownMenuItem,
} from './DropDownButton'
import TeamsIcon from '../images/ms-teams.svg'
import { ITeamsMeeting } from '../interfaces'
import { Link } from './Link'

interface ICheckListHeaderButtonsProps {
	onOverviewClicked?: (event: MouseEvent<HTMLButtonElement>) => void
	teamsMeetings: ITeamsMeeting[]
}

export const CheckListHeaderButtons = ({
	onOverviewClicked,
	teamsMeetings = [],
}: ICheckListHeaderButtonsProps) => (
	<HeaderButtons>
		<Button color='blue' onClick={onOverviewClicked}>
			<FontAwesomeIcon icon={faList} />
		</Button>
		{teamsMeetings && teamsMeetings.length > 0 && (
			<DropDownButton
				svgIcon={
					<SvgIcon
						source={TeamsIcon}
						title='An icon to show the teams meeting dropdown list'
					/>
				}
				color='teamsPurple'
			>
				<DropDownMenu>
					{teamsMeetings.map(tm => (
						<DropDownMenuItem key={tm.time} divider={teamsMeetings.length > 1}>
							<Link href={tm.meetingLink}>
								{dayjs(tm.time).format('DD/MM/YYYY [om] HH:mm')}
							</Link>
						</DropDownMenuItem>
					))}
				</DropDownMenu>
			</DropDownButton>
		)}
	</HeaderButtons>
)
