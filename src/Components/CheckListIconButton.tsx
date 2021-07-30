import React, { MouseEvent } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faEarlybirds } from '@fortawesome/free-brands-svg-icons'
import { faLink, faEdit } from '@fortawesome/free-solid-svg-icons'
import { IconButtonType } from '../enums'

/**
 * Types
 */

interface IIconButtonProps {
	iconButtonType?: IconButtonType
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

interface IIconButtonContainerProps {
	iconButtonType?: IconButtonType
}

/**
 * Framer
 */

const iconButtonVariants = {
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
}

/**
 * Styled Components
 */

const IconButtonContainer = styled(motion.button)<IIconButtonContainerProps>`
	border-radius: 50%;
	width: 2rem;
	height: 2rem;
	transform-origin: center;
	background-color: var(--ib-${props => props.iconButtonType}-background-color);
`

export const CheckListIconButton = ({
	iconButtonType = IconButtonType.Default,
	onClick,
}: IIconButtonProps) => {
	if (iconButtonType === IconButtonType.None) return null
	return (
		<IconButtonContainer
			iconButtonType={iconButtonType}
			variants={iconButtonVariants}
			whileTap='pressed'
			whileHover='hover'
			onClick={onClick}
		>
			{iconButtonType === IconButtonType.Link && <FontAwesomeIcon icon={faLink} />}
			{iconButtonType === IconButtonType.YouTube && (
				<FontAwesomeIcon icon={faYoutube} />
			)}
			{iconButtonType === IconButtonType.Default && (
				<FontAwesomeIcon icon={faEarlybirds} />
			)}
			{iconButtonType === IconButtonType.Exercise && (
				<FontAwesomeIcon icon={faEdit} />
			)}
		</IconButtonContainer>
	)
}
