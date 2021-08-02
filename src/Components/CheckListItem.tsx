import styled from 'styled-components'
import { motion } from 'framer-motion'
import { CheckBox } from '.'
import {
	CheckListAssetButton,
	CheckListPdfButton,
	CheckListLinkButton,
	CheckListSideBarButton,
} from './CheckListButtons'
import { ICheckListItem } from '../interfaces'
import { IconButtonType } from '../enums'
import { useCheckListItem } from '../Hooks'

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

/**
 * Framer Motion
 */

const checkedVariants = {
	checked: {
		opacity: 0.4,
		transition: {
			duration: 0.2,
		},
	},
	unchecked: {
		opacity: 1,
		transition: {
			duration: 0.2,
		},
	},
}

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
			<CheckListCheckBoxContainer>
				<CheckBox
					checkBoxWidth='36px'
					strokeColor='var(--checklist-checkbox-color)'
					strokeWidth={7}
					marginRight='1.5em'
					checked={isChecked}
					checkedChanged={changeChecked}
				/>
				<motion.div
					variants={checkedVariants}
					animate={isChecked ? 'checked' : 'unchecked'}
					style={{
						textDecoration: isChecked ? 'line-through' : 'none',
					}}
				>
					{checkListItem.description}
				</motion.div>
			</CheckListCheckBoxContainer>
			{(() => {
				if (iconButtonType === IconButtonType.Asset) {
					return (
						<CheckListAssetButton
							disabled={isChecked}
							assetId={checkListItem.asset.id}
						/>
					)
				}
				if (iconButtonType === IconButtonType.Pdf) {
					return (
						<CheckListPdfButton
							disabled={isChecked}
							assetId={checkListItem.asset.id}
						/>
					)
				}
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
				if (
					iconButtonType === IconButtonType.YouTube ||
					iconButtonType === IconButtonType.Exercise
				) {
					return (
						<CheckListSideBarButton
							iconButtonType={iconButtonType}
							value={
								iconButtonType === IconButtonType.YouTube
									? checkListItem.youTube.id
									: checkListItem.exercise.id
							}
							disabled={isChecked}
						/>
					)
				}
				return null
			})()}
		</CheckListItemContainer>
	)
}
