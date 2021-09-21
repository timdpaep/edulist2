import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ICheckListItem } from 'interfaces'
import { IconButtonType } from 'enums'
import dayjs from 'dayjs'
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

	useEffect(() => {
		setIsChecked(checked)
	}, [checked])

	return (
		<>
			<motion.div
				variants={checkedVariants}
				animate={isChecked ? 'checked' : 'unchecked'}
				style={{
					alignSelf: 'center',
					paddingRight: '1rem',
					color: 'var(--black)',
					textDecoration: 'inherit',
				}}
			>
				<>
					{checkListItem.description && (
						<>
							<span className='title__main'>
								{checkListItem.description}{' '}
								{checkListItem.duration
									? `(${dayjs.duration(checkListItem.duration * 1000).format('mm:ss')})`
									: ''}
							</span>

							{checkListItem.bigDescription && (
								<span className='title__sub'>{checkListItem.bigDescription}</span>
							)}
						</>
					)}
					{checkListItem.type === IconButtonType.YouTube &&
						!checkListItem.description && (
							<CheckListYouTubeDescription youTubeId={checkListItem.youTube.id} />
						)}
				</>
			</motion.div>
		</>
	)
}
