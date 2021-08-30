import React, { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import device from '../device'

/**
 * Types
 */

interface IIconButtonProps {
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	backgroundColor?: string
	color?: string
	icon?: IconProp
	svgIcon?: any
	className?: string
}

/**
 * Framer Motion
 */

const closeButtonVariants = {
	hover: {
		opacity: 0.4,
		transition: {
			duration: 0.2,
		},
	},
	pressed: {
		scale: 0.9,
		transition: {
			duration: 0.2,
		},
	},
}

/**
 * Styled Components
 */

const IconButtonContainer = styled(motion.button)<IIconButtonProps>`
	font-size: 2rem;
	background-color: ${props => props.backgroundColor};
	box-shadow: none;
	color: ${props => props.color};
	padding: 0;

	@media ${device.tablet} {
		font-size: 1.6rem;
	}
`

export const IconButton = ({
	onClick,
	color = 'var(--black)',
	backgroundColor = 'transparent',
	icon = faTimes,
	className = '',
	svgIcon = null,
}: IIconButtonProps) => (
	<IconButtonContainer
		onClick={onClick}
		color={color}
		backgroundColor={backgroundColor}
		variants={closeButtonVariants}
		whileHover='hover'
		whileTap='pressed'
		className={className}
	>
		{icon && <FontAwesomeIcon icon={icon} />}
		{svgIcon && svgIcon}
	</IconButtonContainer>
)
