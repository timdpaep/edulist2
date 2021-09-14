import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ICheckListItem } from 'interfaces'
import { EduModalType, IconButtonType } from 'enums'
import { useEduModal } from 'Hooks'
import dayjs from 'dayjs'
import { CheckListYouTubeDescription } from './CheckListDescriptions'
import { LinkButton } from '.'

/**
 * TypeScript
 */

interface IChecklistItemDescriptionProps {
	checkListItem: ICheckListItem
	checked: boolean
}

/**
 * Framer Motion
 */

const checkedVariants = {
	checked: {
		transition: {
			duration: 0.2,
		},
	},
	unchecked: {
		transition: {
			duration: 0.2,
		},
	},
}

export const CheckListItemDescription = ({
	checkListItem,
	checked = false,
}: IChecklistItemDescriptionProps) => {
	const [isChecked, setIsChecked] = useState<boolean>(checked)
	const { openModal } = useEduModal()

	useEffect(() => {
		setIsChecked(checked)
	}, [checked])

	return (
		<>
			<motion.div
				variants={checkedVariants}
				animate={isChecked ? 'checked' : 'unchecked'}
				style={{
					display: 'flex',
				}}
			>
				{checkListItem.bigDescription ? (
					<LinkButton
						onClick={() =>
							openModal({
								type: EduModalType.None,
								value: checkListItem.bigDescription,
							})
						}
						disabled={isChecked}
						className='checklistitem-link-button'
					>
						{checkListItem.description && (
							<>
								{checkListItem.description}{' '}
								{checkListItem.duration
									? `(${dayjs
											.duration(checkListItem.duration * 1000)
											.format('HH[u]mm[m]ss[s]')})`
									: ''}
							</>
						)}
						{checkListItem.type === IconButtonType.YouTube &&
							!checkListItem.description && (
								<CheckListYouTubeDescription youTubeId={checkListItem.youTube.id} />
							)}
					</LinkButton>
				) : (
					<>
						{checkListItem.description && (
							<>
								{checkListItem.description}{' '}
								{checkListItem.duration
									? `(${dayjs.duration(checkListItem.duration * 1000).format('mm:ss')})`
									: ''}
							</>
						)}
						{checkListItem.type === IconButtonType.YouTube &&
							!checkListItem.description && (
								<CheckListYouTubeDescription youTubeId={checkListItem.youTube.id} />
							)}
					</>
				)}
			</motion.div>
		</>
	)
}
