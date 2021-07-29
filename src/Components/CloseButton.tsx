import React, { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import device from '../device'

/**
 * Types
 */

interface ICloseButtonProps {
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
	right?: number
	top?: number
	backgroundColor?: string
	color?: string
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

const CloseButtonContainer = styled(motion.button)<ICloseButtonProps>`
	position: absolute;
	right: ${props => props.right}px;
	top: ${props => props.top}px;
	font-size: 2rem;
	background-color: ${props => props.backgroundColor};
	box-shadow: none;
	color: ${props => props.color};
	padding: 0;

	@media ${device.tablet} {
		font-size: 1.6rem;
	}
`

export const CloseButton = ({
	onClick,
	right = 0,
	top = 0,
	color = 'var(--black)',
	backgroundColor = 'transparent',
}: ICloseButtonProps) => (
	<CloseButtonContainer
		onClick={onClick}
		top={top}
		right={right}
		color={color}
		backgroundColor={backgroundColor}
		variants={closeButtonVariants}
		whileHover='hover'
		whileTap='pressed'
	>
		<FontAwesomeIcon icon={faTimes} />
	</CloseButtonContainer>
)
