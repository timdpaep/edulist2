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
		textDecoration: 'none',
	},
	hover: {
		opacity: 0.9,
		textDecoration: 'underline',
		transition: {
			duration: 0.1,
		},
	},
	pressed: {
		transition: {
			duration: 0.1,
		},
	},
	disabled: {
		transition: {
			duration: 0.3,
		},
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

	@media ${device.mobile} {
		font-size: var(--checklist-item-size);
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
			onFocus={() => {
				checkListIconButtonControls.start('hover')
			}}
			onBlur={() => {
				checkListIconButtonControls.start('default')
			}}
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
			<CheckListItemDescription
				checkListItem={checkListItem}
				checked={isDisabled}
			/>

			<div
				style={{
					width: '2.4rem',
					height: '2.4rem',
					backgroundColor: `var(--ib-${iconButtonType}-background-color)`,
					borderRadius: '50%',
					boxShadow: 'var(--level-2)',
					flex: '0 0 auto',
					textAlign: 'center',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'white',
				}}
			>
				<ButtonIcon iconButtonType={iconButtonType} />
			</div>
		</IconButtonContainer>
	)
}
