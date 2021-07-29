import React, { useState, useEffect, MouseEvent } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { CloseButton, Loader } from '.'
import device from '../device'

/**
 * Interfaces
 */

interface ISideBarContainerProps {
	open?: boolean
}

interface ISideBarProps {
	open?: boolean
	loading?: boolean
	children?: React.ReactNode
	onCloseClicked?: (event: MouseEvent<HTMLButtonElement>) => void
}

/**
 * Framer Motion
 */

const sideBarVariants = {
	open: {
		right: 0,
		transition: {
			duration: 0.5,
			ease: 'easeIn',
		},
	},
	hidden: {
		right: '-50vw',
		transition: {
			duration: 0.5,
			ease: 'easeOut',
		},
	},
}

/**
 * Styled components
 */

const SideBarContainer = styled(motion.aside)<ISideBarContainerProps>`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	right: ${props => (props.open ? '0' : '-100vw')};
	padding: 30px;
	background-color: var(--white);
	box-shadow: var(--level-3);
	z-index: 99;
	overflow: scroll;

	@media ${device.tablet} {
		width: 50vw;
		right: ${props => (props.open ? '0' : '-50vw')};
	}
`

export const SideBar = ({
	open = false,
	loading = false,
	children,
	onCloseClicked,
}: ISideBarProps) => {
	const [isOpen, setIsOpen] = useState(open)
	const [isLoading, setIsLoading] = useState(loading)

	useEffect(() => {
		setIsOpen(open)
	}, [open])
	useEffect(() => {
		setIsLoading(loading)
	}, [loading])

	return (
		<SideBarContainer
			variants={sideBarVariants}
			initial='hidden'
			animate={isOpen ? 'open' : 'hidden'}
		>
			{children}
			{isLoading && <Loader />}
			<CloseButton
				onClick={e => {
					if (onCloseClicked) {
						setIsLoading(false)
						onCloseClicked(e)
					} else setIsOpen(false)
				}}
				right={30}
				top={30}
				color='var(--black)'
			/>
		</SideBarContainer>
	)
}
