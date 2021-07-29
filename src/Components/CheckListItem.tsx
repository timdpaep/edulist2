import styled from 'styled-components'
import { CheckBox, IconButton } from '.'
import { ICheckListItem } from '../interfaces'
import { IconButtonType } from '../enums'
import { useEduSideBar } from '../Hooks'

/**
 * Types
 */

interface ICheckListItemProps {
	checklistItem: ICheckListItem
}

/**
 * Styled Components
 */

const CheckListItemContainer = styled.li`
	line-height: 0;
	margin-bottom: 1.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const CheckListCheckBoxContainer = styled.div`
	display: flex;
	align-items: center;
`

export const CheckListItem = ({ checklistItem }: ICheckListItemProps) => {
	const { openSideBar } = useEduSideBar()

	const action = ({ type, value }: ICheckListItem) => {
		switch (type) {
			case 'link':
				window.open(value, '_blank')?.focus()
				break
			case 'youtube':
				openSideBar('youtube', value)
				break
			case 'exercise':
				openSideBar('exercise', value)
				break
			default:
				break
		}
	}

	return (
		<CheckListItemContainer id={checklistItem.id}>
			<CheckListCheckBoxContainer>
				<CheckBox
					checkBoxWidth='36px'
					strokeColor='var(--checklist-checkbox-color)'
					strokeWidth={7}
					marginRight='1.5em'
				/>
				<div>{checklistItem.description}</div>
			</CheckListCheckBoxContainer>
			<IconButton
				onClick={() => {
					action(checklistItem)
				}}
				iconButtonType={checklistItem.type as IconButtonType}
			/>
		</CheckListItemContainer>
	)
}
