import React, { useState, useEffect, MouseEvent } from 'react'
import styled from 'styled-components'
import { motion, useAnimation } from 'framer-motion'
import {
	faChevronLeft,
	faChevronRight,
	faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'Hooks'
import { IconButton, Loader } from '.'
import device, { deviceSizes } from '../device'

/**
 * Interfaces
 */

interface ISideBarContainerProps {
	open?: boolean
	fullScreen: boolean
}

interface ISideBarProps {
	open?: boolean
	loading?: boolean
	children?: React.ReactNode
	onCloseClicked?: (event: MouseEvent<HTMLButtonElement>) => void
	onClosed?: () => void
	onAnimationEnded?: (isOpen: boolean) => void
	animationDuration: number
}

/**
 * Framer Motion
 */

const sideBarVariants = (animationDuration: number) => ({
	open: {
		right: 0,
		width: '50vw',
		transition: {
			duration: animationDuration,
			ease: 'easeIn',
		},
	},
	fullScreen: {
		width: '100vw',
		transition: {
			duration: animationDuration,
			ease: 'easeOut',
		},
	},
	hidden: {
		width: '50vw',
		right: '-50vw',
		transition: {
			duration: animationDuration,
			ease: 'easeOut',
		},
	},
})

/**
 * Styled components
 */

const SideBarHeader = styled.header`
	background-color: var(--white);
	z-index: 999;
	height: 80px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 30px;
	position: sticky;
	top: 0;
	left: 0;
`

const SideBarContent = styled.div`
	padding: 0 30px 30px 30px;
`

const SideBarContainer = styled(motion.aside)<ISideBarContainerProps>`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	right: ${props => (props.open ? '0' : '-100vw')};
	background-color: var(--white);
	box-shadow: var(--level-3);
	z-index: 99;
	overflow: scroll;

	.chevronLeftRight {
		display: none;
	}

	@media ${device.mobile} {
		.chevronLeftRight {
			display: block;
		}
	}
`

export const SideBar = ({
	open = false,
	loading = false,
	animationDuration = 0.3,
	children,
	onCloseClicked,
	onClosed,
	onAnimationEnded,
}: ISideBarProps) => {
	const sideBarControls = useAnimation()
	const isSmall = useMediaQuery(`(max-width: ${deviceSizes.mobile})`)
	const [isOpen, setIsOpen] = useState(open)
	const [isLoading, setIsLoading] = useState(loading)
	const [isFullScreen, setIsFullScreen] = useState(false)

	useEffect(() => {
		setIsOpen(open)
		sideBarControls.start(open ? 'open' : 'hidden').then(() => {
			if (onAnimationEnded) onAnimationEnded(open)
		})
	}, [open])

	useEffect(() => {
		setIsLoading(loading)
	}, [loading])

	useEffect(() => {
		if (isOpen && isSmall) sideBarControls.start('fullScreen')
		if (!isSmall && isOpen) {
			if (isFullScreen) sideBarControls.start('fullScreen')
			else sideBarControls.start('open')
		}
	}, [isSmall])

	return (
		<SideBarContainer
			fullScreen={isFullScreen}
			open={isOpen}
			variants={
				isSmall
					? {
							...sideBarVariants(animationDuration),
							open: {
								...sideBarVariants(animationDuration).open,
								width: '100vw',
							},
					  }
					: sideBarVariants(animationDuration)
			}
			initial={isOpen ? 'open' : 'hidden'}
			animate={sideBarControls}
		>
			<SideBarHeader>
				<div>
					<IconButton
						className='chevronLeftRight'
						icon={isFullScreen ? faChevronRight : faChevronLeft}
						onClick={() => {
							setIsFullScreen(!isFullScreen)
							if (!isFullScreen) sideBarControls.start('fullScreen')
							if (isFullScreen) sideBarControls.start('open')
						}}
					/>
				</div>
				<div>
					<IconButton
						icon={faTimes}
						onClick={e => {
							setIsFullScreen(false)
							setIsOpen(false)
							setIsLoading(false)
							if (onCloseClicked) onCloseClicked(e)
							setTimeout(() => {
								if (onClosed) onClosed()
							}, animationDuration * 1000)
						}}
					/>
				</div>
			</SideBarHeader>
			{isLoading && <Loader />}
			<SideBarContent>{children}</SideBarContent>
		</SideBarContainer>
	)
}
