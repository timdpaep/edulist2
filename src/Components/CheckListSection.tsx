import React from 'react'
import { SectionContainer } from '../Layout/SectionContainer'
import { ICheckListSection } from '../interfaces'
import { CheckListItem } from '.'

interface ICheckListSectionProps {
	checkListSection: ICheckListSection
}

export const CheckListSection = ({
	checkListSection,
}: ICheckListSectionProps) => (
	<SectionContainer>
		<h2>{checkListSection.title}</h2>
		<ul>
			{checkListSection.checklistItems &&
				checkListSection.checklistItems.map(checklistItem => (
					<CheckListItem key={checklistItem.id} checklistItem={checklistItem} />
				))}
		</ul>
	</SectionContainer>
)
