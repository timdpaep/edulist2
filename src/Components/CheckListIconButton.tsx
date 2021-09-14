import { useState, MouseEvent, useEffect } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import { ButtonIcon } from '.'
import { IconButtonType } from '../enums'
import device from '../device'

/**
 * Types
 */

interface IIconButtonProps {
	iconButtonType?: IconButtonType
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
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
		scale: 1,
	},
	hover: {
		opacity: 0.5,
		transition: {
			duration: 0.1,
		},
	},
	pressed: {
		scale: 0.9,
		transition: {
			duration: 0.1,
		},
	},
	disabled: {
		scale: 1,
		transition: {
			duration: 0.3,
		},
	},
}

/**
 * Styled Components
 */

const IconButtonContainer = styled(motion.button)<IIconButtonContainerProps>`
	border-radius: 50%;
	width: calc(2 * var(--checklist-item-size-mobile));
	height: calc(2 * var(--checklist-item-size-mobile));
	transform-origin: center;
	background-color: var(--ib-${props => props.iconButtonType}-background-color);
	box-shadow: var(--level-2);
	font-size: var(--checklist-item-size-mobile);

	@media ${device.mobile} {
		width: calc(2 * var(--checklist-item-size));
		height: calc(2 * var(--checklist-item-size));
		font-size: var(--checklist-item-size);
	}
`

export const CheckListIconButton = ({
	iconButtonType = IconButtonType.Default,
	onClick,
	disabled = false,
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
			onHoverStart={() => {
				if (!isDisabled) checkListIconButtonControls.start('hover')
			}}
			onHoverEnd={() => {
				if (!isDisabled) checkListIconButtonControls.start('default')
			}}
			onTapStart={() => {
				if (!isDisabled) checkListIconButtonControls.start('pressed')
			}}
			onTap={() => {
				if (!isDisabled) checkListIconButtonControls.start('default')
			}}
			disabled={isDisabled}
		>
			<ButtonIcon iconButtonType={iconButtonType} />
		</IconButtonContainer>
	)
}
