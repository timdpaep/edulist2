import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ButtonIcon } from '.'
import { IconButtonType } from '../enums'

/**
 * Types
 */

interface IIconLinkProps {
	iconButtonType?: IconButtonType
	href?: string
	download?: string
}

interface IIconLinkContainerProps {
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

const IconLinkContainer = styled(motion.a)<IIconLinkContainerProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	border-radius: 50%;
	width: 2rem;
	height: 2rem;
	transform-origin: center;
	background-color: var(--ib-${props => props.iconButtonType}-background-color);
`

export const CheckListIconLink = ({
	iconButtonType = IconButtonType.Default,
	href,
	download = '',
}: IIconLinkProps) => {
	if (iconButtonType === IconButtonType.None) return null
	return (
		<IconLinkContainer
			iconButtonType={iconButtonType}
			variants={iconButtonVariants}
			whileTap='pressed'
			whileHover='hover'
			href={href}
			download={download}
		>
			<ButtonIcon iconButtonType={iconButtonType} />
		</IconLinkContainer>
	)
}
