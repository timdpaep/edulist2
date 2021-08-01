import styled from 'styled-components'
import { SectionContainer } from '../Layout/SectionContainer'
import { ICheckListSection } from '../interfaces'
import { CheckListItem } from '.'

interface ICheckListSectionProps {
	checkListSection: ICheckListSection
}

const SectionCheckList = styled.ul`
	li:last-child {
		margin-bottom: 0;
	}
`

export const CheckListSection = ({
	checkListSection,
}: ICheckListSectionProps) => (
	<SectionContainer>
		<h2>{checkListSection.title}</h2>
		<SectionCheckList>
			{checkListSection.checklistItems &&
				checkListSection.checklistItems.map(checklistItem => (
					<CheckListItem key={checklistItem.id} checklistItem={checklistItem} />
				))}
		</SectionCheckList>
	</SectionContainer>
)
