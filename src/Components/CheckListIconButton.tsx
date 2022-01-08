import { useState, MouseEvent, useEffect } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { ButtonIcon, CheckListItemDescription } from '.'
import { IconButtonType } from '../enums'
import device from '../device'
import { ICheckListItem } from '../interfaces'

/**
 * Types
 */

interface IIconButtonProps {
	iconButtonType?: IconButtonType
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
	checkListItem: ICheckListItem
}

interface IIconButtonContainerProps {
	iconButtonType?: IconButtonType
}

/**
 * Framer
 */

const iconButtonVariants = {
	default: {
		opacity: 1,
	},
}

/**
 * Styled Components
 */

const IconButtonContainer = styled(motion.button)<IIconButtonContainerProps>`
	transform-origin: center;
	font-size: var(--checklist-item-size-mobile);
	display: flex;
	justify-content: space-between;
	background: transparent;
	border-radius: 0;
	padding: 0;

	:hover,
	:focus {
		text-decoration: underline;
	}
	@media ${device.mobile} {
		font-size: var(--checklist-item-size);
	}

	.title__main {
		font-size: var(--checklist-item-size);
		width: 100%;
		display: inline-block;
		text-decoration: inherit;
		left: 0;
	}

	.title__sub {
		font-size: 0.9rem;
		text-decoration: inherit;
		left: 0;
	}

	.icon-wrapper {
		width: 2.4rem;
		height: 2.4rem;
		background-color: var(--ib-${props => props.iconButtonType}-background-color);
		border-radius: 50%;
		box-shadow: var(--level-2);
		flex: 0 0 auto;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transition: all 0.2s ease;
	}

	:hover .icon-wrapper,
	:focus .icon-wrapper {
		box-shadow: var(--level-1);
		transform: scale(1.05);
	}
`

export const CheckListIconButton = ({
	iconButtonType = IconButtonType.Default,
	onClick,
	disabled = false,
	checkListItem,
}: IIconButtonProps) => {
	const checkListIconButtonControls = useAnimation()
	const [isDisabled] = useState(disabled)

	useEffect(() => {
		if (disabled) checkListIconButtonControls.start('disabled')
		else checkListIconButtonControls.start('default')
	}, [disabled])

	if (iconButtonType === IconButtonType.None) return null

	return (
		<IconButtonContainer
			iconButtonType={iconButtonType}
			variants={iconButtonVariants}
			animate={checkListIconButtonControls}
			onClick={onClick}
			disabled={isDisabled}
		>
			<CheckListItemDescription
				checkListItem={checkListItem}
				checked={isDisabled}
			/>

			<div className='icon-wrapper'>
				<ButtonIcon iconButtonType={iconButtonType} />
			</div>
		</IconButtonContainer>
	)
}
