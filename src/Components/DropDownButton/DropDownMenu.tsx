import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

interface IDropDownMenuProps {
	position?: 'left' | 'right'
	children?: React.ReactNode
}

const DropDownMenuList = styled(motion.ul)<IDropDownMenuProps>`
	position: absolute;
	display: block;
	list-style-type: none;
	${({ position }) =>
		position && position === 'left' ? 'left: 0;' : 'right: 0;'}
	margin: 0;
	border: 1px solid var(--lightGrey);
	background-color: white;
	box-shadow: var(--level-1);
	/* Button Padding, 2X (top & bottom) + 2px of shadow */
	top: calc(1em + (var(--button-padding) * 2) + 4px);
`

export const DropDownMenu = ({ position, children }: IDropDownMenuProps) => (
	<AnimatePresence>
		<DropDownMenuList
			initial={{ opacity: 0, y: -30, scale: 0.5 }}
			animate={{
				opacity: 1,
				y: 0,
				scale: 1,
				transition: { type: 'spring', duration: 0.2 },
			}}
			exit={{ opacity: 0 }}
			position={position}
		>
			{children}
		</DropDownMenuList>
	</AnimatePresence>
)
