import styled from 'styled-components'
import { SectionContainer } from '../Layout/SectionContainer'
import { ICheckListSection } from '../interfaces'
import { CheckListItem } from '.'

interface ICheckListSectionProps {
	checkListSection: ICheckListSection
	checkListId: string
	checklistSectionDuration?: string
}

const SectionCheckList = styled.ul`
	li:last-child {
		margin-bottom: 0;
	}
`

export const CheckListSection = ({
	checkListSection,
	checkListId,
	checklistSectionDuration = '',
}: ICheckListSectionProps) => (
	<SectionContainer>
		<h2>
			{checkListSection.title}{' '}
			{checklistSectionDuration ? ` (${checklistSectionDuration})` : ''}
		</h2>
		<SectionCheckList>
			{checkListSection.checklistItems &&
				checkListSection.checklistItems.map(checklistItem => (
					<CheckListItem
						key={checklistItem.id}
						checkListItem={checklistItem}
						checkListId={checkListId}
					/>
				))}
		</SectionCheckList>
	</SectionContainer>
)
