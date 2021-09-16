import styled from 'styled-components'
import { CheckBox, CheckListItemDescription } from '.'
import {
	CheckListAssetButton,
	CheckListPdfButton,
	CheckListLinkButton,
	CheckListSideBarButton,
	CheckListModalButton,
} from './CheckListButtons'
import { ICheckListItem } from '../interfaces'
import { IconButtonType } from '../enums'
import { useCheckListItem } from '../Hooks'
import device from '../device'
import { eduSideBarTypeFromIconButtonType } from './CheckListButtons/CheckListSideBarButton'
import { eduModalTypeFromIconButtonType } from './CheckListButtons/CheckListModalButton'

/**
 * Types
 */

interface ICheckListItemProps {
	checkListItem: ICheckListItem
	checkListId: string
}

/**
 * Styled Components
 */

const CheckListItemContainer = styled.li`
	line-height: normal;
	margin-bottom: 1.2rem;
	display: grid;
	grid-template-columns: calc(2 * var(--checklist-item-size-mobile)) 1fr calc(
			2 * var(--checklist-item-size-mobile)
		);
	column-gap: 1.5rem;
	align-items: center;
	justify-content: space-between;

	@media ${device.mobile} {
		grid-template-columns: calc(2 * var(--checklist-item-size)) 1fr calc(
				2 * var(--checklist-item-size)
			);
	}
`

export const CheckListItem = ({
	checkListItem,
	checkListId,
}: ICheckListItemProps) => {
	const { isChecked, changeChecked } = useCheckListItem({
		checkListId,
		checkListItem,
	})
	const iconButtonType = checkListItem.type as IconButtonType

	return (
		<CheckListItemContainer id={checkListItem.id}>
			<CheckBox
				checkBoxWidth='2.4rem'
				checkBoxHeight='2.4rem'
				strokeColor='var(--checklist-checkbox-color)'
				strokeWidth={7}
				checked={isChecked}
				checkedChanged={changeChecked}
			/>

			<CheckListItemDescription
				checkListItem={checkListItem}
				checked={isChecked}
			/>

			{(() => {
				/**
				 * Assets
				 */

				if (iconButtonType === IconButtonType.Asset) {
					return (
						<CheckListAssetButton
							disabled={isChecked}
							assetId={checkListItem.asset.id}
						/>
					)
				}

				/**
				 * PDF
				 */

				if (iconButtonType === IconButtonType.Pdf) {
					return (
						<CheckListPdfButton
							disabled={isChecked}
							assetId={checkListItem.asset.id}
						/>
					)
				}

				/**
				 * Link | GitHub
				 */

				if (
					iconButtonType === IconButtonType.Link ||
					iconButtonType === IconButtonType.GitHub
				) {
					return (
						<CheckListLinkButton
							iconButtonType={iconButtonType}
							url={checkListItem.url}
							target='_blank'
							disabled={isChecked}
						/>
					)
				}

				/**
				 * YouTube | Exercise
				 */

				if (
					iconButtonType === IconButtonType.YouTube ||
					iconButtonType === IconButtonType.Exercise ||
					iconButtonType === IconButtonType.MdDoc
				) {
					return (
						<CheckListSideBarButton
							eduSidebarType={eduSideBarTypeFromIconButtonType(iconButtonType)}
							iconButtonType={iconButtonType}
							value={(() => {
								switch (iconButtonType) {
									case IconButtonType.YouTube:
										return checkListItem.youTube.id
									case IconButtonType.Exercise:
										return checkListItem.exercise.id
									case IconButtonType.MdDoc:
										return checkListItem.mdDoc.id
									default:
										return ''
								}
							})()}
							disabled={isChecked}
						/>
					)
				}

				/**
				 * Slides
				 */

				if (iconButtonType === IconButtonType.Slides) {
					return (
						<CheckListModalButton
							iconButtonType={iconButtonType}
							eduModalType={eduModalTypeFromIconButtonType(iconButtonType)}
							value={checkListItem.slide.id}
							disabled={isChecked}
						/>
					)
				}

				/**
				 * Last type hero...
				 */

				return null
			})()}
		</CheckListItemContainer>
	)
}
