import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ICheckListItem } from 'interfaces'
import { IconButtonType } from 'enums'
import { CheckListYouTubeDescription } from './CheckListDescriptions'

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

export const CheckListItemDescription = ({
	checkListItem,
	checked = false,
}: IChecklistItemDescriptionProps) => {
	const [isChecked, setIsChecked] = useState<boolean>(checked)

	useEffect(() => {
		setIsChecked(checked)
	}, [checked])

	return (
		<>
			<motion.div
				variants={checkedVariants}
				animate={isChecked ? 'checked' : 'unchecked'}
				style={{
					textDecoration: isChecked ? 'line-through' : 'none',
				}}
			>
				{checkListItem.description && <>{checkListItem.description}</>}
				{checkListItem.type === IconButtonType.YouTube &&
					!checkListItem.description && (
						<CheckListYouTubeDescription youTubeId={checkListItem.youTube.id} />
					)}
			</motion.div>
		</>
	)
}
